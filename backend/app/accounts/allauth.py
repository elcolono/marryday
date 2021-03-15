from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class AccountAdapter(DefaultAccountAdapter):

    def get_email_confirmation_redirect_url(self, request):
        if settings.DEBUG:
            return 'http://localhost:3002/login?verification=1'
        else:
            return '/login?verification=1'
