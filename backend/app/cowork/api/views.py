from rest_framework import generics, permissions, status
from rest_framework.response import Response

from ..models import RentObject, Location, Booking
from .serializers.common import (
    RentObjectSerializer, BookingSerializer, LocationSerializer)
from dateutil.parser import parse
from django.db.models import Prefetch
from datetime import timedelta


# Booking
class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):

        booking_data = request.data
        booking_data['user'] = request.user.id

        serializer = BookingSerializer(data=booking_data)

        # Check if time range is not yet booked

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Locations
class LocationListView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


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
        location = self.request.query_params.get('location', None)
        rent_type = self.request.query_params.get('type', None)
        date = self.request.query_params.get('date', None)

        if location is not None:
            queryset = queryset.filter(location=location)
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
