""" Payment URLs """
from django.urls import path
from django.conf.urls import url
from payments.api import views


urlpatterns = [

    url(r'^payment-account/(?P<pk>[0-9]+)$', views.get_delete_update_payment_account,
        name='get_delete_update_payment_account'),
    url(r'^payment-accounts/$', views.list_create_payment_accounts,
        name='list_create_payment_accounts'),



    # LEGACY
    # Payment
    path('payment/<uuid>', views.PaymentRetrieveView.as_view(),
         name='retrieve-payment'),
    url(r'^test-payment/$', views.test_payment),

    # Payment Account
    url(r'^accounts/$', views.UserPaymentAccounts.as_view(), name='accounts'),

    # Stripe Account
    url(r'^create-custom-account', views.create_stripe_custom_account,
        name='create-custom-account'),

    # Stripe Customer
    url(r'^receive-setup-intent-client-secret',
        views.receive_setup_intent_client_secret),
    url(r'^create-stripe-customer/$', views.create_stripe_customer),
    url(r'^retrieve-stripe-customer/$', views.retrieve_stripe_customer),
    url(r'^retrieve_stripe_customer_payment_methods/$',
        views.retrieve_stripe_customer_payment_methods),

    url(r'^update-stripe-customer/$', views.update_stripe_customer),

    # Stripe Payment
    url(r'^save-stripe-info/$', views.save_stripe_info),
    url(r'^confirm-payment-intent/$', views.confirm_payment_intent),
    url(r'^retrieve-payment-intent/$', views.retrieve_payment_intent),
    url(r'^retrieve-invoice/$', views.retrieve_invoice),
]
