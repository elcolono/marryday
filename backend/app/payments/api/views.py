from django.conf import settings
import stripe
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from payments.models import Payment
from .serializers.common import PaymentSerializer
from rest_framework import generics, permissions, status


stripe.api_key = settings.STRIPE_SECRET_KEY

# Payment


class PaymentRetrieveView(generics.RetrieveAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    lookup_field = 'uuid'


@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com',
    )

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_stripe_customer(request):
    data = request.data
    email = data['email']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create()
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer_id': customer.id, 'extra_msg': extra_msg}})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def retrieve_stripe_customer(request):
    data = request.data
    stripe_id = data['id']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.retrieve(stripe_id)

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer': customer_data, 'extra_msg': extra_msg}})


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_stripe_customer(request):
    data = request.data
    stripe_id = data['id']
    email = data['email']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.modify(
        stripe_id,
        email=email
    )

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer': customer_data, 'extra_msg': extra_msg}})


@api_view(['POST'])
def confirm_payment_intent(request):
    data = request.data
    payment_intent_id = data['payment_intent_id']

    stripe.PaymentIntent.confirm(payment_intent_id)

    return Response(status=status.HTTP_200_OK, data={"message": "Success"})


@api_view(['POST'])
def retrieve_payment_intent(request):
    try:
        data = request.data
        payment_intent_id = data['payment_intent_id']
        paymnet_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
    except Exception as e:
        return Response({'error': str(e)})
    return Response(status=status.HTTP_200_OK, data={"message": "Success", "data": paymnet_intent})


@api_view(['POST'])
def retrieve_invoice(request):
    try:
        data = request.data
        invoice_id = data['invoice_id']
        invoice = stripe.Invoice.retrieve(invoice_id)
    except Exception as e:
        return Response({'error': str(e)})
    return Response(status=status.HTTP_200_OK, data={"message": "Success", "data": invoice})


@api_view(['POST'])
def save_stripe_info(request):
    data = request.data
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data
    print(customer_data)

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

    # creating subscription

    # stripe.Subscription.create(
    #     customer=customer,
    #     items=[
    #         {
    #             'price': 'price_1...'
    #         }
    #     ]
    # )

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer_id': customer.id,
                                                                                    'extra_msg': extra_msg}})
