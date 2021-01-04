import stripe
from django.conf import settings

from rest_framework import generics, permissions, status
from rest_framework.response import Response

from ..models import RentObject, Location, Booking, City
from .serializers.common import (
    RentObjectSerializer, BookingSerializer, LocationSerializer, CitySerializer)
from dateutil.parser import parse
from django.db.models import Prefetch
from datetime import timedelta

from django.db.models import Q

# All API VIEWS:
# https://www.django-rest-framework.org/api-guide/generic-views/#retrieveapiview

# Cites


class CityListView(generics.ListAPIView):
    queryset = City.objects.filter(is_active=True)
    serializer_class = CitySerializer


# Booking
class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request):

        booking_data = request.data
        booking_data['user'] = request.user.id

        # Check if payment data is complete
        if not booking_data['email']:
            return Response("Email is required", status=status.HTTP_400_BAD_REQUEST)

        if not booking_data['payment_method_id']:
            return Response("Payment card is required", status=status.HTTP_400_BAD_REQUEST)
        
        
        # Check if overlapping bookings exist
        rent_object_bookings = Booking.objects.filter(
            rent_object=booking_data['rent_object'])

        overlapping_bookings = rent_object_bookings.filter(
            Q(start__range=[booking_data['start'], booking_data['end']]) | Q(end__range=[booking_data['start'], booking_data['end']]))

        if overlapping_bookings:
            return Response("Overlapping booking detected.", status=status.HTTP_400_BAD_REQUEST)

        
        # Run serializer
        serializer = BookingSerializer(data=booking_data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save Booking
        booking = serializer.save()

        # Make payment
        email = booking_data['email']
        payment_method_id = booking_data['payment_method_id']
        extra_msg = ''
        # checking if customer with provided email already exists

        # STRIPE Payment
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [payment_intent_data] - capture the payment later
            # [customer_email] - prefill the email input in the form
            # For full details see https://stripe.com/docs/api/checkout/sessions/create
            customer_data = stripe.Customer.list(email=email).data

            if len(customer_data) == 0:
                # creating customer
                customer = stripe.Customer.create(
                    email=email,
                    payment_method=payment_method_id,
                    invoice_settings={
                        'default_payment_method': payment_method_id
                    }
                )
            else:
                customer = customer_data[0]
                extra_msg = "Customer already existed."

            # creating paymentIntent

            stripe.PaymentIntent.create(customer=customer,
                                        payment_method=payment_method_id,
                                        currency='pln', amount=1500,
                                        confirm=True)

        except Exception as e:
            booking.delete()
            return Response({'error': str(e)})

        return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer_id': customer.id,
                                                                                        'extra_msg': extra_msg}})


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
    serializer_class = BookingSerializer

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
