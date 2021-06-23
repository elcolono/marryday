"""Test account serializers
"""
from django.test import TestCase

from ..models import User
from ..serializers.common import UserSerializer


class TestUserSerializer(TestCase):
    """Test module for account serializers
    """

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@test.com',
            password='top_secret'
        )

    def test_user_contains_expected_fields(self):
        """Test user contains expected fields
        """
        data = UserSerializer(self.user).data
        self.assertEqual(set(data.keys()), set(
            ['id', 'email', 'first_name', 'last_name', 'is_company', 'is_visitor']))
