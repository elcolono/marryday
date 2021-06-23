""" Test account views """
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from ..models import User
from ..serializers.common import UserSerializer


class TestUserRetrieveUpdateView(TestCase):
    """Test module for account user views
    """

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@test.com',
            password='top_secret'
        )
        self.client = APIClient()

    def test_retrieve_valid_user(self):
        """Test retrieve a valid iuser
        """
        self.client.force_authenticate(user=self.user)

        url = reverse('user-detail', args=[self.user.id])
        response = self.client.get(url)
        serializer = UserSerializer(self.user)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_invalid_user(self):
        """Test retrieve a invalid user
        """
        self.client.force_authenticate(user=self.user)
        invalid_user_id = 9999

        url = reverse('user-detail', args=[invalid_user_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_user_unauthenticated(self):
        """Test retrieve user unauthenticated
        """
        url = reverse('user-detail', args=[self.user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user_unauthorized(self):
        """Test retrieve user unauthorized
        """
        unauthorized_user = User.objects.create(
            email='user2@test.com',
            password='secret'
        )
        self.client.force_authenticate(user=unauthorized_user)

        url = reverse('user-detail', args=[self.user.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_user_with_valid_data(self):
        """Test update user with valid data
        """
        self.client.force_authenticate(user=self.user)

        url = reverse('user-detail', args=[self.user.id])
        data = {
            'email': 'testuser@test.com',
            'first_name': 'John',
            'last_name': 'Doe',
        }
        response = self.client.put(url, data=data)
        updated_user = User.objects.get(pk=self.user.id)

        self.assertEqual(response.data, UserSerializer(updated_user).data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_with_invalid_data(self):
        """Test update user with invalid data
        """
        self.client.force_authenticate(user=self.user)

        url = reverse('user-detail', args=[self.user.id])
        data = {
            'email': 'testuser@com',
            'first_name': 'John',
            'last_name': 'Doe',
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_user_with_existing_email(self):
        """Test update user with existing email
        """
        self.client.force_authenticate(user=self.user)
        existing_user = User.objects.create_user(
            email='testuser2@test.com',
            password='top_secret'
        )

        url = reverse('user-detail', args=[self.user.id])
        data = {
            'email': existing_user.email,
            'first_name': 'John',
            'last_name': 'Doe',
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_user_unauthenticated(self):
        """Test update user unauthenticated
        """
        url = reverse('user-detail', args=[self.user.id])
        data = {
            'email': 'testuser@test.com',
            'first_name': 'John',
            'last_name': 'Doe',
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_unauthorized(self):
        """Test update user unauthorized
        """
        unauthorized_user = User.objects.create(
            email='user2@test.com',
            password='secret'
        )
        self.client.force_authenticate(unauthorized_user)

        url = reverse('user-detail', args=[self.user.id])
        data = {
            'email': 'testuser@test.com',
            'first_name': 'John',
            'last_name': 'Doe',
        }
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
