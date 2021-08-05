""" Allauth extensions """

from django.conf import settings

from allauth.account.adapter import DefaultAccountAdapter


class AccountAdapter(DefaultAccountAdapter):
    """Custom AccountAdapter is created and assigned in the core.settings: ACCOUNT_ADAPTER

    Args:
        DefaultAccountAdapter (class)
    """

    def send_mail(self, template_prefix, email, context):
        if not settings.DEBUG:
            context['activate_url'] = settings.CLIENT_DOMAIN + \
                'api/v1/accounts-rest/registration/account-confirm-email/' + \
                context['key'] + '/'

        msg = self.render_mail(template_prefix, email, context)
        msg.subject = 'Erfolgreiche Registrierung. Bitte bestätigen Sie Ihre E-Mail Adresse.'
        msg.from_email = 'MoWo Spaces<no-reply@mowo.space>'
        msg.send()

    def get_email_confirmation_redirect_url(self, request):
        if settings.DEBUG:
            return 'http://localhost:3002/login?verification=1'
        else:
            return '/login?verification=1'
