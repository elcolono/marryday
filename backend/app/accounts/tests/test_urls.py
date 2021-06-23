"""Account url tests
"""
from django.test import SimpleTestCase
from django.urls import resolve, reverse

from ..views import UserView
RANDOM_PK = 999


class TestAccountUrls(SimpleTestCase):
    """Test module for account urls
    """

    def test_user_detail_url_is_resolved(self):
        """Test user detail url is resolved
        """
        url = reverse('user-detail', args=[RANDOM_PK])
        self.assertEqual(resolve(url).func.view_class, UserView)
