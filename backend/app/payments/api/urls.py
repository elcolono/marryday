from django.urls import path
from django.conf.urls import url
from payments.api import views


urlpatterns = [
    # Cites
    path("payment/<uuid>", views.PaymentRetrieveView.as_view(),
         name="retrieve-payment"),
    # Cites
    url(r'^test-payment/$', views.test_payment),

    # Stripe Customer
    url(r'^user-payment-accounts/$', views.UserPaymentAccounts.as_view()),
    url(r'^create-bank-account/$', views.create_bank_account),
    url(r'^create-stripe-customer/$', views.create_stripe_customer),
    url(r'^retrieve-stripe-customer/$', views.retrieve_stripe_customer),
    url(r'^update-stripe-customer/$', views.update_stripe_customer),

    # Stripe Payment
    url(r'^save-stripe-info/$', views.save_stripe_info),
    url(r'^confirm-payment-intent/$', views.confirm_payment_intent),
    url(r'^retrieve-payment-intent/$', views.retrieve_payment_intent),
    url(r'^retrieve-invoice/$', views.retrieve_invoice),
]
