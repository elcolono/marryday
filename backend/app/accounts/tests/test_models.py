""" Test account models """
from django.test import TestCase

from ..managers import UserManager
from ..models import User


class UserModelTest(TestCase):
    """ Test module for User model """

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@test.com',
            password='top_secret'
        )

    def test_username_none(self):
        """Test if username is None
        """
        username = self.user.username
        self.assertEqual(username, None)

    def test_email_unique(self):
        """Test if email has unique parameter
        """
        unique = self.user._meta.get_field('email').unique
        self.assertEqual(unique, True)

    def test_username_field(self):
        """Test USERNAME_FIELD is 'email'
        """
        username_field = self.user.USERNAME_FIELD
        self.assertEqual(username_field, 'email')

    def test_required_fields(self):
        """Test REQUIRED_FIELDS array is empty
        """
        required_fields = self.user.REQUIRED_FIELDS
        self.assertEqual(required_fields, [])

    def test_manager(self):
        """Test model manager is custom UserManager
        """
        manager = self.user._meta.default_manager
        self.assertIsInstance(manager, UserManager)

    def test_is_visitor(self):
        """Test is_visitor default value is false
        """
        is_visitor = self.user.is_visitor
        self.assertEqual(is_visitor, False)

    def test_is_company(self):
        """Test is_visitor default value is false
        """
        is_company = self.user.is_company
        self.assertEqual(is_company, False)

    def test_string_output(self):
        """Test string method outputs email
        """
        email = self.user.__str__()
        self.assertEqual(email, 'testuser@test.com')
