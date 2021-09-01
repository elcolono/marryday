import urllib.parse
from os import path

from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm

from accounts.models import User
from django.utils.translation import ugettext_lazy as _

from allauth.account import app_settings as allauth_settings
from allauth.account.utils import user_pk_to_url_str
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

from django.template.loader import render_to_string
from allauth.account.forms import (
    EmailAwarePasswordResetTokenGenerator,
    ResetPasswordForm,
)
from django.core.mail import send_mail


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name',
                  'last_name', 'is_company', 'is_visitor',)


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user')


class RegisterSerializer(serializers.Serializer):
    """
    https://stackoverflow.com/questions/36910373/django-rest-auth-allauth-registration-with-email-first-and-last-name-and-witho
    """
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    # Doesnt has password2 field in User Model
    password2 = serializers.CharField(required=True, write_only=True)
    is_company = serializers.BooleanField(required=True, write_only=True)
    is_visitor = serializers.BooleanField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                _("The two password fields didn't match."))
        return data

    def save(self, request):
        user = User(
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            is_company=self.validated_data['is_company'],
            is_visitor=self.validated_data['is_visitor'],
        )
        user.set_password(self.validated_data['password1'])
        user.save()
        return user


class SendInviteForm(ResetPasswordForm):
    """
    used to send an invitation to onboard the platform and reset the password
    """

    default_token_generator = EmailAwarePasswordResetTokenGenerator()

    def send_email_invite(self, email, uri, uid, token):
        params = {"uid": uid, "token": token}
        query_string = urllib.parse.urlencode(params)
        context = {
            "uri": uri,
            "uid": uid,
            "token": token,
            "title": "Received Password-Reset Link",
            "button_title": "Reset Password",
            "button_reset_link": uri + '?' + query_string
        }
        msg_plain = render_to_string('account/email/example_message.txt', context)
        msg_html = render_to_string("account/email/email_default_message.html", context)
        send_mail(
            "Welcome!",
            msg_plain,
            None,
            [email],
            html_message=msg_html,
        )

    def save(self, request, **kwargs):
        email = self.cleaned_data["email"]
        token_generator = kwargs.get("token_generator", self.default_token_generator)
        for user in self.users:
            temp_key = token_generator.make_token(user)
            uri = path.join(settings.CLIENT_DOMAIN, "reset-password")
            self.send_email_invite(email, uri, user_pk_to_url_str(user), temp_key)
        return self.cleaned_data["email"]


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'email_template_name': 'account/email/example_message.txt',
            'extra_email_context': {
                'pass_reset_url': "Test123"
            },
            'request': request,
        }
        self.reset_form.save(**opts)
