""" Payment API Views """
from django.conf import settings
import stripe

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from accounts.models import User

from payments.models import Payment, PaymentAccount, PaymentAccountUser
from .serializers.common import PaymentSerializer, PaymentAccountSerializer

from .permissions import IsUpdatePaymentAccount

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def get_delete_update_payment_account(request, pk):
    try:
        payment_account = PaymentAccount.objects.get(pk=pk)
        authorized_users = payment_account.users.filter(
            paymentaccountuser__user=request.user)
        if not authorized_users:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    except PaymentAccount.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # get details of a single payment account
    if request.method == 'GET':
        serializer = PaymentAccountSerializer(payment_account)
        return Response(serializer.data)

    # delete a singe payment account
    if request.method == 'DELETE':
        return Response({})

    # update details of a payment account
    if request.method == 'PUT':
        return Response({})


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def list_create_payment_accounts(request):

    # get all payment acounts
    if request.method == 'GET':
        payment_accounts = PaymentAccount.objects.filter(
            paymentaccountuser__user=request.user)
        serializer = PaymentAccountSerializer(payment_accounts, many=True)
        return Response(serializer.data)

    # insert a new payment account record
    if request.method == 'POSt':
        return Response({})


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_stripe_account(request, pk):
    """ Delete stripe custom account """
    payment_account = PaymentAccount.objects.get(stripe_account=pk)

    if not payment_account:
        return Response(status=status.HTTP_404_NOT_FOUND)
    authorized_users = payment_account.users.filter(
        paymentaccountuser__user=request.user)

    if not authorized_users:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        stripe.Account.delete(
            payment_account.stripe_account
        )
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': str(e)})
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_stripe_account(request):
    """ Create stripe custom account and update payment account with created account id """
    payment_account_pk = request.data['payment_account_pk']
    country_code = request.data['country']
    payment_account = PaymentAccount.objects.get(pk=payment_account_pk)

    if payment_account.stripe_account:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Stripe account already exists'})

    authorized_users = payment_account.users.filter(
        paymentaccountuser__user=request.user)
    if not authorized_users:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        account = stripe.Account.create(
            country=country_code,
            type='custom',
            capabilities={
                'card_payments': {
                    'requested': True,
                },
                'transfers': {
                    'requested': True,
                },
            },
        )
    except stripe.error.InvalidRequestError as error_message:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': str(error_message)})

    serializer = PaymentAccountSerializer(
        payment_account, data={'stripe_account': account.id})
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    serializer.save()
    return Response(account, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_stripe_account_links(request):
    try:
        payment_account_pk = request.data['payment_account_pk']
        payment_account = PaymentAccount.objects.get(pk=payment_account_pk)

        if not payment_account.stripe_account:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        authorized_users = payment_account.users.filter(
            paymentaccountuser__user=request.user)

        if not authorized_users:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        account_links = stripe.AccountLink.create(
            account=payment_account.stripe_account,
            refresh_url='https://example.com/reauth',
            return_url='https://example.com/return',
            type='account_onboarding',
            collect='eventually_due',
        )
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': str(e)})

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'account_links': account_links}})

# Stripe Customer


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


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def retrieve_stripe_customer_payment_methods(request):
    data = request.data
    stripe_id = data['id']
    customer_payment_methods = stripe.PaymentMethod.list(
        customer=stripe_id,
        type="sepa_debit"
    )

    return Response(status=status.HTTP_200_OK, data={'message': 'Success', 'data': {'customer': customer_payment_methods}})


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


# Stripe Bank Account
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsUpdatePaymentAccount])
def receive_setup_intent_client_secret(request):
    try:
        data = request.data
        customer_id = data['stripe_customer_id']

        setup_intent = stripe.SetupIntent.create(
            payment_method_types=['sepa_debit'],
            customer=customer_id
        )

        client_secret = setup_intent.client_secret
    except Exception as e:
        return Response({'error': str(e)})
    return Response(status=status.HTTP_200_OK, data={"message": "Success", "data": client_secret})


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


# Payment Intent
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
