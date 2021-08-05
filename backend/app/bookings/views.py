"""products views"""
import stripe

from django.conf import settings

from rest_framework import generics, status
from rest_framework.response import Response

from .models import Booking
from .serializers import BookingCreateSerializer, BookingRetrieveSerializer
from products.models import Product

from dateutil.parser import parse
from datetime import timedelta

from django.db.models import Q
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from payments.models import Payment
from payments.serializers import PaymentSerializer

from django.http import JsonResponse


# All API VIEWS:
# https://www.django-rest-framework.org/api-guide/generic-views/#retrieveapiview
def send_test_mail(request):
    try:
        subject, from_email, to = 'Erfolgreiche Buchung', 'MoWo Spaces<no-reply@mowo.space>', [
            'andreas.siedler@gmail.com']
        text_content = 'This is an important message.'
        html_content = render_to_string(
            'booking-success.html',
            {'invoice_link': f'{settings.CLIENT_DOMAIN}invoices/2f23c7f8-e68c-4c5d-bc1e-da0e0ff0bcfd'})
        msg = EmailMultiAlternatives(
            subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
    except Exception as e:
        return JsonResponse({'error': str(e)})
    return JsonResponse(status=status.HTTP_200_OK, data={'message': 'Success'})


class BookingRetrieveView(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingRetrieveSerializer
    lookup_field = 'uuid'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(data=serializer.data)


class BookingCreateView(generics.CreateAPIView):
    # serializer_class = BookingCreateSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request):

        booking_data = request.data

        ######################## Validate data ########################
        rent_object = booking_data['rent_object']
        start = booking_data['start']
        end = booking_data['end']
        email = booking_data['email']
        payment_method_id = booking_data['payment_method_id']
        check_price = booking_data['check_price']
        check_price_cent = int(float(check_price) * 100)
        location_slug = booking_data['location_slug']
        location = Product.objects.get(slug=location_slug)
        contacts = location.forwarding_contacts.all()

        # ToDo check if price is corrent

        # Check if payment data is complete
        if not rent_object:
            return Response("Rent object is required", status=status.HTTP_400_BAD_REQUEST)

        if not start:
            return Response("Booking start is required", status=status.HTTP_400_BAD_REQUEST)

        if not end:
            return Response("Booking end is required", status=status.HTTP_400_BAD_REQUEST)

        if not email:
            return Response("Email is required", status=status.HTTP_400_BAD_REQUEST)

        if not payment_method_id:
            return Response("Payment card is required", status=status.HTTP_400_BAD_REQUEST)

        if not check_price_cent:
            return Response("Check price cent card is required", status=status.HTTP_400_BAD_REQUEST)

        if not location:
            return Response("No location was found", status=status.HTTP_400_BAD_REQUEST)

        ######################## Populate Booking data ########################

        booking_data['user'] = request.user.id
        booking_data['location'] = location.id

        ######################## Overlapping Bookings ########################
        rent_object_bookings = Booking.objects.filter(
            rent_object=rent_object)

        overlapping_bookings = rent_object_bookings.filter(
            Q(start__range=[start, parse(end) - timedelta(seconds=1)]) | Q(
                end__range=[parse(start) + timedelta(seconds=1), end]))

        if overlapping_bookings:
            return Response("Overlapping booking detected.", status=status.HTTP_400_BAD_REQUEST)

        ######################## Validate and Save Booking ########################
        # Run serializer
        serializer = BookingCreateSerializer(data=booking_data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save Booking
        booking = serializer.save()

        ######################## Stripe Payment ########################
        extra_msg = ''
        # checking if customer with provided email already exists

        # STRIPE Payment
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            # creating paymentIntent
            payment_intent = stripe.PaymentIntent.create(payment_method=payment_method_id,
                                                         currency='eur', amount=check_price_cent,
                                                         confirm=True)

            ######################## Create Payment ########################
            payment = Payment(
                booking=booking, payment_intent_id=payment_intent.id, amount=payment_intent.amount)
            if not payment:
                return Response("Could not create payment.", status=status.HTTP_400_BAD_REQUEST)
            payment.clean()
            payment.save()
            # booking_data['payment_intent_id'] = payment_intent.id

        except Exception as e:
            payment.delete()
            booking.delete()
            print(str(e))
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

        ######################## Sending Booking Email to Customer ########################
        try:
            subject, from_email, to = 'Erfolgreiche Buchung', 'MoWo Spaces<no-reply@mowo.space>', email
            text_content = 'This is an important message.'
            html_content = render_to_string(
                'booking-success.html', {
                    'booking_link': f'{settings.CLIENT_DOMAIN}bookings/{booking.uuid}',
                    'payment_link': f'{settings.CLIENT_DOMAIN}payments/{payment.uuid}'},
            )
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            booking.delete()
            return Response({'error': str(e)})

        ######################## Sending Booking Confirmation to Product Forwarding Contacts ########################
        try:
            for contact in contacts:
                subject, from_email, to = 'Erfolgreiche Buchung', 'MoWo Spaces<no-reply@mowo.space>', contact.email
                text_content = 'This is an important message.'
            html_content = render_to_string(
                'booking-confirmation.html', {
                    'booking_link': f'{settings.CLIENT_DOMAIN}bookings/{booking.uuid}',
                    'payment_link': f'{settings.CLIENT_DOMAIN}payments/{payment.uuid}'},
            )
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            booking.delete()
            return Response({'error': str(e)})

        ######################## Return Success ########################

        payment_serializer = PaymentSerializer(payment)

        return Response(data=payment_serializer.data, status=status.HTTP_201_CREATED)
