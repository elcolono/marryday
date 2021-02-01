"""cowork views"""
import stripe
import googlemaps

import json
import requests
from django.conf import settings

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import RentObject, Location, Booking, City, Province, State, Country, District, LocationImage
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

from mailchimp_marketing.api_client import ApiClientError
import mailchimp_marketing as MailchimpMarketing

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

        ######################## Populate Booking data ########################

        booking_data['user'] = request.user.id
        booking_data['location'] = location.id

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

        ######################## Sending Booking Confirmation to Location Forwarding Contacts ########################
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
                'rent_object_bookings',
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


# Mailchimp Views
class MailchimpAudienceAPIVIEWSet(APIView):
    """ COMMENTS """

    def post(self, request):

        mailchimp_api_key = settings.MAILCHIMP_API_KEY
        mailchimp_data_center = settings.MAILCHIMP_DATA_CENTER
        mailchimp_email_list_id = settings.MAILCHIMP_EMAIL_LIST_ID
        # Check if payment data is complete
        if not mailchimp_api_key or not mailchimp_email_list_id or not mailchimp_email_list_id:
            return Response("Technical error", status=status.HTTP_400_BAD_REQUEST)

        try:
            """ COMMENTS """
            mailchimp = MailchimpMarketing.Client()
            mailchimp.set_config({
                "api_key": mailchimp_api_key,
                "server": mailchimp_data_center
            })
            list_id = mailchimp_email_list_id

            email_address = request.data['email']
            member_info = {
                "email_address": email_address,
                "status": "subscribed",
                # "merge_fields": {
                #     "FNAME": "Prudence",
                #     "LNAME": "McVankab"
                # }
            }
        except Exception as e:
            return Response({'error': str(e)})
        try:
            response = mailchimp.lists.add_list_member(list_id, member_info)
        except ApiClientError as error:
            # print("An exception occurred: {}".format(error.text))
            json_error = json.loads(error.text)
            return Response("Sie sind bereits angemeldet.", status=status.HTTP_400_BAD_REQUEST)
        return Response("Was successful")

# Mailchimp Views


class PipeDriveAPIVIEWSet(APIView):
    """ COMMENTS """

    def post(self, request):

        pipedrive_api_token = settings.PIPEDRIVE_API_TOKEN
        email_address = request.data['email']
        first_name = request.data['firstName']
        last_name = request.data['lastName']
        message_note = request.data['messageNote']

        if not pipedrive_api_token or not email_address or not first_name or not last_name:
            return Response("All data is required", status=status.HTTP_400_BAD_REQUEST)

        # Search for person
        response = requests.get(
            f'{settings.PIPEDRIVE_URL}persons/search?api_token={pipedrive_api_token}&exact_match=true&term={email_address}')
        content = json.loads(response.content)

        # if person not exist create person else get id from reqeust
        if not content['data']['items']:
            post_data = {
                'name': f'{first_name} {last_name}',
                'email': email_address
            }
            response = requests.post(
                f'{settings.PIPEDRIVE_URL}persons?api_token={pipedrive_api_token}', data=post_data)
            content = json.loads(response.content)
            person_id = content['data']['id']
        else:
            person_id = content['data']['items'][0]['item']['id']

        # Create deal
        post_data = {
            'title': f'{first_name} {last_name} deal',
            'person_id': person_id
        }
        response = requests.post(
            f'{settings.PIPEDRIVE_URL}deals?api_token={pipedrive_api_token}', data=post_data)
        content = json.loads(response.content)

        # Add note
        post_data = {
            'content': message_note,
            'deal_id': content['data']['id']
        }
        response = requests.post(
            f'{settings.PIPEDRIVE_URL}notes?api_token={pipedrive_api_token}', data=post_data)
        content = response.content

        return Response("Nachricht erfolgreich gesendet!")


# Google Places
class GoolgePlacesAPIViewSet(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        try:
            from django.core.files import File
            import os
            api_key = 'AIzaSyDFbdovhyx9DCYJIO4Jt0_ppwgXxWvM5ek'
            search_location = request.data

            thumbnail_photo = search_location.get('thumbnail_photo')
            place_id = search_location.get('place_id')
            detail_location_url = ('https://maps.googleapis.com/maps/api/place/details/json'
                                   '?place_id=%s'
                                   '&key=%s') % (place_id, api_key)

            retrieved_detail_location = requests.get(detail_location_url)
            doc = json.loads(retrieved_detail_location.content).get('result')

            street_number = None
            address = None
            district = None
            locality = None
            province = None
            state = None
            country = None
            postal_code = None

            for address_component in doc['address_components']:
                # {"long_name": "9", "short_name": "9", "types": ["street_number"]}
                if "street_number" in address_component['types']:
                    street_number = address_component['long_name']
                if "route" in address_component['types']:
                    address = address_component['long_name']
                if "sublocality" in address_component['types']:
                    district = address_component['long_name']
                if "locality" in address_component['types']:
                    locality = address_component['long_name']
                if "administrative_area_level_2" in address_component['types']:
                    province = address_component['long_name']
                if "administrative_area_level_1" in address_component['types']:
                    state = address_component['long_name']
                if "country" in address_component['types']:
                    country = address_component['long_name']
                if "postal_code" in address_component['types']:
                    postal_code = address_component['long_name']

            title = doc.get('name')
            business_status = doc.get('business_status')

            formatted_address = doc.get('formatted_address')
            vicinity = doc.get('vicinity')
            formatted_phone_number = doc.get('formatted_phone_number')
            public_phone = doc.get('international_phone_number')
            website = doc.get('website')

            geometry = doc.get('geometry')

            opening_hour_periods = doc.get('opening_hours').get('periods')
            reviews = doc.get('reviews')
            rating = doc.get('rating')
            user_ratings_total = doc.get('user_ratings_total')

            google_place_id = doc.get('place_id')
            google_reference = doc.get('reference')
            google_plus_code = doc.get('plus_code')

            utc_offset = doc.get('utc_offset')
            google_photos = doc.get('photos')

            ######################## Validate and Create District, Locality, Province, Country ########################
            if country is not None:
                country, created = Country.objects.get_or_create(title=country)
            if state is not None:
                state, created = State.objects.get_or_create(
                    title=state, country=country)
            if province is not None:
                province, created = Province.objects.get_or_create(
                    title=province, state=state)
            if locality is not None:
                locality, created = City.objects.get_or_create(
                    title=locality, postcode=postal_code, province=province)
            if district is not None:
                district, created = District.objects.get_or_create(
                    title=district, postcode=postal_code, locality=locality)

            ######################## Validate and Save Location ########################
            new_location = Location(title=title, country=country, state=state, province=province, district=district, city=locality,
                                    address=address, street_number=street_number, geometry=geometry, public_phone=public_phone, formatted_address=formatted_address,
                                    vicinity=vicinity, formatted_phone_number=formatted_phone_number, website=website, utc_offset=utc_offset,
                                    business_status=business_status, opening_hour_periods=opening_hour_periods, google_place_id=google_place_id, google_reference=google_reference,
                                    reviews=reviews, rating=rating, user_ratings_total=user_ratings_total, google_plus_code=google_plus_code)
            if not new_location:
                Response("Could not create new location",
                         status=status.HTTP_400_BAD_REQUEST)

            new_location.clean()
            new_location.save()

            ######################## Validate and Save Location Images ########################

            if thumbnail_photo is not None:
                google_photos.insert(0, thumbnail_photo)

            for index, item in enumerate(google_photos):
                if index >= 20:
                    break
                photo_reference = item['photo_reference']
                max_width = item.get('width')
                max_height = item.get('height')
                city_image_url = ('https://maps.googleapis.com/maps/api/place/photo'
                                  '?maxwidth=%s'
                                  '&maxheight=%s'
                                  '&photoreference=%s'
                                  '&key=%s') % (max_width, max_height, photo_reference, api_key)

                retrieved_image = requests.get(city_image_url)
                with open(item['photo_reference'] + '.jpg', 'wb') as f:
                    f.write(retrieved_image.content)

                reopen = open(item['photo_reference'] + '.jpg', 'rb')
                django_file = File(reopen)

                location_image = LocationImage(
                    title=f'cowork-{locality.slug}-{new_location.slug}-{index}', location=new_location, google_photo_reference=photo_reference)
                location_image.image.save(
                    f'cowork-{locality.slug}-{new_location.slug}-{index}' + '.jpg', django_file, save=True)
                os.remove(
                    item['photo_reference'] + '.jpg')
                if index == 0 and thumbnail_photo is not None:
                    location_image.is_thumbnail = True
                location_image.save()

            ######################## Response ########################
            new_location_serializer = LocationSerializer(new_location)
        except Exception as e:
            new_location.delete()
            return JsonResponse({'error': str(e)})
        return Response(data=new_location_serializer.data, status=status.HTTP_201_CREATED)
