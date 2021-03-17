from django.urls import path
from accounts.api.views import (UserView,)

urlpatterns = [
    # User
    # path("users/", UserListView.as_view(), name="user-list"),
    path("user/<int:pk>/", UserView.as_view(), name="user-detail"),
]