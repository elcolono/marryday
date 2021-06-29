from django.urls import path
from profiles.views import *

urlpatterns = [
    # Company
    path("company/<int:pk>/", CompanyView.as_view(), name="company-detail"),
    # Candidate
    path("visitors/", VisitorListView.as_view(), name="candidate-list"),
    path("visitors/<int:pk>/", VisitorView.as_view(), name="candidate-detail"),
    # UserCompany
    path("usercompanies/", UserCompanyListView.as_view(), name="usercompany-list"),
]