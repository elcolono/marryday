import stripe
from django.conf import settings

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from ..models import RentObject, Location, Booking, City
from .serializers.common import (
    RentObjectSerializer, BookingCreateSerializer, BookingRetrieveSerializer, LocationSerializer, CitySerializer)
from dateutil.parser import parse
from django.db.models import Prefetch
from datetime import timedelta

from django.db.models import Q
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from payments.models import Payment
from payments.api.serializers.common import PaymentSerializer

from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from decimal import Decimal

# All API VIEWS:
# https://www.django-rest-framework.org/api-guide/generic-views/#retrieveapiview


# Mailing
from django.core.mail import send_mail


def send_test_mail(request):
    try:
        # send_mail(
        #     'Subject here',
        #     'Here is the message.',
        #     'from@example.com',
        #     ['andreas.siedler@gmail.com'],
        #     fail_silently=False,
        # )
        subject, from_email, to = 'Erfolgreiche Buchung', 'MoWo Spaces<no-reply@mowo.space>', [
            'andreas.siedler@gmail.com']
        text_content = 'This is an important message.'
        html_content = render_to_string(
            'booking-success.html', {'invoice_link': f'{settings.CLIENT_DOMAIN}invoices/2f23c7f8-e68c-4c5d-bc1e-da0e0ff0bcfd'})
        msg = EmailMultiAlternatives(
            subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
    except Exception as e:
        return JsonResponse({'error': str(e)})
    return JsonResponse(status=status.HTTP_200_OK, data={'message': 'Success'})


# Cites
class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_active=True)
    serializer_class = CitySerializer


# Booking
class BookingRetrieveView(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingRetrieveSerializer
    lookup_field = 'uuid'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        payment_intent_id = instance.payment_intent_id
        paymnet_intent = stripe.PaymentIntent.retrieve(payment_intent_id,)

        serializer = self.get_serializer(instance)
        return Response(data={'booking': serializer.data, 'payment_intent': paymnet_intent})


class BookingCreateView(generics.CreateAPIView):
    # serializer_class = BookingCreateSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request):

        booking_data = request.data
        booking_data['user'] = request.user.id

        ######################## Validate data ########################
        rent_object = booking_data['rent_object']
        start = booking_data['start']
        end = booking_data['end']
        email = booking_data['email']
        payment_method_id = booking_data['payment_method_id']
        check_price = booking_data['check_price']
        check_price_cent = int(float(check_price) * 100)
        location_slug = booking_data['location_slug']
        location = Location.objects.get(slug=location_slug)
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

        ######################## Overlapping Bookings ########################
        rent_object_bookings = Booking.objects.filter(
            rent_object=rent_object)

        overlapping_bookings = rent_object_bookings.filter(
            Q(start__range=[start, parse(end) - timedelta(seconds=1)]) | Q(end__range=[parse(start) + timedelta(seconds=1), end]))

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
                'booking-success.html', {'invoice_link': f'{settings.CLIENT_DOMAIN}invoices/{booking.uuid}'})
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
        except Exception as e:
            booking.delete()
            return Response({'error': str(e)})

        ######################## Sending Booking Confirmation to Location Forwarding Contacts ########################
        try:
            for contact in contacts:
                subject, from_email, to = 'Erfolgreiche Buchung', 'MoWo Spaces<no-reply@mowo.space>', contact.email
                text_content = 'This is an important message.'
                html_content = render_to_string(
                    'booking-confirmation.html', {'first_name': contact.first_name, 'last_name': contact.last_name})
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


# Locations
class LocationListView(generics.ListAPIView):
    queryset = Location.objects.filter(is_active=True)
    serializer_class = LocationSerializer


class LocationRetrieveView(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = 'slug'


# RentObjects
class RentObjectListView(generics.ListCreateAPIView):
    # queryset = RentObject.objects.all()
    serializer_class = RentObjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filtering against `location` & `type` query parameter in the URL.
        """
        queryset = RentObject.objects.all()
        location_slug = self.request.query_params.get('location', None)
        rent_type = self.request.query_params.get('type', None)
        date = self.request.query_params.get('date', None)

        if location_slug is not None:
            queryset = queryset.filter(location__slug=location_slug)
        if rent_type is not None:
            queryset = queryset.filter(type=rent_type)
        if date is not None:
            # startdate has to be parsed so for timedelta calculation
            enddate = parse(date) + timedelta(days=1)
            queryset = queryset.prefetch_related(Prefetch(
                'bookings',
                queryset=Booking.objects.filter(
                    # values can be strings or date objects
                    # startdate=string and enddate=Dateobject
                    start__range=[date, enddate])
            ))
        return queryset

        # queryset = RentObject.objects.all()
        # location = self.request.query_params.get('location', None)
        # type = self.request.query_params.get('type', None)
        # startdate = self.request.query_params.get('date', None)
        # start = self.request.query_params.get('start', None)
        # duration = self.request.query_params.get('duration', None)

        # if location is not None:
        #     queryset = queryset.filter(location=location)
        # if type is not None:
        #     queryset = queryset.filter(type=type)
        # if startdate is not None:
        #     # startdate has to be parsed so for timedelta calculation
        #     enddate = parse(startdate) + timedelta(days=1)
        #     queryset = queryset.prefetch_related(Prefetch(
        #         'bookings',
        #         queryset=Booking.objects.filter(
        #             # values can be strings or date objects
        #             # startdate=string and enddate=Dateobject
        #             start__range=[startdate, enddate])
        #     ))
        # if start is not None and duration is not None:
        #     end = parse(start) + timedelta(minutes=int(duration))
        #     # bookings = Booking.objects.filter(rent_object=start__gte=start)
        #     queryset = queryset.exclude(bookings__start__range=[start, end])
        #     queryset = queryset.exclude(bookings__end__range=[start, end])
        # return queryset


# CheckIns
class CheckInListView(generics.ListCreateAPIView):
    # queryset = RentObject.objects.all()
    # serializer_class = RentObjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = BookingRetrieveSerializer

    def get_queryset(self):
        """
        Get rentobects
        Get bookings and sort them by start

        Loop all bookings of rent_objects
        each rent_object (of selected type)

        Before first booking
        Check if duration is available in => Current time to nearest booking time range
        if true return curent time

        Then
        Check if duration is available in => nearest booking end to second nearest booking start
        if true return nearest booking end
        """
        queryset = RentObject.objects.all()
        location = self.request.query_params.get('location', None)
        type = self.request.query_params.get('type', None)
        startdate = self.request.query_params.get('date', None)
        duration = self.request.query_params.get('duration', None)

        if location is not None:
            queryset = queryset.filter(location=location)
        if type is not None:
            queryset = queryset.filter(type=type)
        if startdate is not None:
            # startdate has to be parsed so for timedelta calculation
            enddate = parse(startdate) + timedelta(days=1)
            queryset = queryset.prefetch_related(Prefetch(
                'bookings',
                queryset=Booking.objects.filter(
                    # values can be strings or date objects
                    # startdate=string and enddate=Dateobject
                    start__range=[startdate, enddate]).order_by('-start')
            ))
        bookings = queryset.values_list('bookings')
        # if duration is not None:
        #     checkins = []
        #     init = True
        #     for booking in queryset.bookings:
        #         if init:

        return bookings
