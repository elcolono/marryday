from django.contrib import admin
from .models import Payment
# Register your models here.


class PaymentAdmin(admin.ModelAdmin):
    search_fields = ('payment_intent_id', 'invoice_no')
    list_display = ('payment_intent_id', 'invoice_no')
    list_filter = ('payment_intent_id', 'invoice_no')


admin.site.register(Payment, PaymentAdmin)
