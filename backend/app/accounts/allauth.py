from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class AccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_redirect_url(self, request):
        if settings.DEBUG:
            return 'http://localhost:3002/signin?verification=1'
        else:
            return '/signin?verification=1'
