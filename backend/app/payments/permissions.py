from rest_framework import permissions
from payments.models import PaymentAccount, PaymentAccountUser

# Check if User is admin of payment account


class IsUpdatePaymentAccount(permissions.BasePermission):

    def has_permission(self, request, view):
        # can write custom code
        request_user = request.user
        data = request.data
        stripe_id = data['stripe_customer_id']
        payment_accounts = PaymentAccount.objects.filter(stripe=stripe_id)

        for payment_account in payment_accounts:
            users = payment_account.users.all()
            for user in users:
                if user == request_user:
                    payment_account_user = PaymentAccountUser.objects.get(
                        user=user, payment_account=payment_account)
                    if payment_account_user.role == 'admin':
                        return True

        return False
