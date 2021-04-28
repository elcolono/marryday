from django.contrib import admin
from .models import Payment, PaymentAccount, PaymentAccountUser
# Register your models here.


class PaymentAccountInline(admin.TabularInline):
    model = PaymentAccountUser


class PaymentAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'stripe_customer', 'stripe_account',)
    inlines = (PaymentAccountInline,)


class PaymentAdmin(admin.ModelAdmin):
    search_fields = ('invoice_no',
                     'amount', 'invoice_date',)
    list_display = ('invoice_no',
                    'amount', 'invoice_date',)
    list_filter = ('invoice_no',
                   'amount', 'invoice_date',)
    fields = ('booking', 'invoice_no',  'amount',
              'invoice_date', 'created_at', 'updated_at',)
    readonly_fields = ('invoice_date', 'created_at', 'updated_at',)


admin.site.register(Payment, PaymentAdmin)
admin.site.register(PaymentAccount, PaymentAccountAdmin)
