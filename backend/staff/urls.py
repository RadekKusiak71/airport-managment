from django.urls import path

from .views import HomeView, CustomLoginView, CustomLogoutView, FlightsView, AddFlightView, UpdateFlightView, DeleteFlightView

app_name = 'staff'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('flights/', FlightsView.as_view(), name='flights'),
    path('add_flight/', AddFlightView.as_view(), name='add_flight'),
    path('update_flight/<int:pk>', UpdateFlightView.as_view(), name='update_flight'),
    path('delete_flight/<int:pk>', DeleteFlightView.as_view(), name='delete_flight'),
]
