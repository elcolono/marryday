from django.conf.urls import url

from payments import views

urlpatterns = [
    url(r'^test-payment/$', views.test_payment),
    url(r'^save-stripe-info/$', views.save_stripe_info),
    url(r'^confirm-payment-intent/$', views.confirm_payment_intent),
    url(r'^retrieve-payment-intent/$', views.retrieve_payment_intent),
    url(r'^retrieve-invoice/$', views.retrieve_invoice),
]
