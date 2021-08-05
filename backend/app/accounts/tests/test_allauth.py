"""Test accounts allaouth
"""
from django.core import mail
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


class TestAccountAdapter(TestCase):
    """Test module for Allaout AccountAdapter
    """

    def setUp(self):
        self.client = APIClient()

    def test_registration_send_email(self):
        """Test registration email is sent correctly
        Docs: https://timonweb.com/django/testing-emails-in-django/
        'rest-register' is defined in the rest_auth/register/urls.py/
        """
        url = reverse('rest_register')
        data = {
            "email": "testuser@email.com",
            "first_name": "John",
            "last_name": "Doe",
            "password1": "noCommonPassword",
            "password2": "noCommonPassword",
            "is_company": True,
            "is_visitor": False
        }
        response = self.client.post(url, data=data)
        assert len(mail.outbox) == 1
        assert response.status_code == status.HTTP_201_CREATED
        assert mail.outbox[0].subject == 'Erfolgreiche Registrierung. Bitte bestätigen Sie Ihre E-Mail Adresse.'
        assert mail.outbox[0].from_email == 'MoWo Spaces<no-reply@mowo.space>'
        assert mail.outbox[0].to == [data['email']]
