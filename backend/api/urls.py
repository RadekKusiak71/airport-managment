from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import UserRegisterView, CustomLoginView, AirportListView, FlightsAvailabilityView, FlightsListView

app_name = 'api'

urlpatterns = [
    #jwt
    path('login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('user/register/', UserRegisterView.as_view(), name='user-register'),
    path('airports/', AirportListView.as_view(), name='get-airports'),
    path('flights/availability/', FlightsAvailabilityView.as_view(), name='flight-availability'),
    path('flights/', FlightsListView.as_view(), name='get-airports'),
]
