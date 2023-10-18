from datetime import timedelta, datetime
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from staff.models import Airport, Flight

from .serializers import UserRegisterSerializer, MyTokenObtainPairSerializer, AirportSerializer, FlightsSerializer, FlightsListSerializer


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email']
            )
            user.set_password(serializer.validated_data['password'])
            user.save()
            response_data = {
                "success": True,
                "data": {
                    "username": user.username,
                    "email": user.email
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        response_data = {
            "success": False,
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


class CustomLoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class AirportListView(generics.ListAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer


class FlightsAvailabilityView(generics.CreateAPIView):
    serializer_class = FlightsSerializer

    def create(self, request, *args, **kwargs):
        departure_date_str = request.data.get('departure_date')
        arrival_date_str = request.data.get('arrival_date')
        departure_airport_pk = request.data.get('departure_airport')
        arrival_airport_pk = request.data.get('arrival_airport')

        response_data = {'flights': [], 'approximate_flights': []}

        departure_date = datetime.strptime(departure_date_str, '%Y-%m-%d')
        arrival_date = datetime.strptime(arrival_date_str, '%Y-%m-%d')

        flights_exact = Flight.objects.filter(
            departure_date__date=departure_date.date(),
            arrival_date__date=arrival_date.date(),
            departure_airport_id=departure_airport_pk,
            arrival_airport_id=arrival_airport_pk
        )

        flights_approximate = Flight.objects.filter(
            departure_date__date__range=(departure_date - timedelta(days=10), departure_date + timedelta(days=10)),
            arrival_date__date__range=(arrival_date.date() - timedelta(days=10), arrival_date.date() + timedelta(days=10)),
            departure_airport_id=departure_airport_pk,
            arrival_airport_id=arrival_airport_pk
        ).exclude(id__in=flights_exact)

        flights = FlightsSerializer(flights_exact, many=True).data
        approximate_flights = FlightsSerializer(flights_approximate, many=True).data

        if flights or approximate_flights:
            response_data = {
                'flights': flights,
                'approximate_flights': approximate_flights
            }

        if not (flights or approximate_flights):
            response_data['message'] = 'There are no available flights for the given parameters'
            return Response(response_data, status=404)

        return Response(response_data)


class FlightsListView(generics.ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightsListSerializer
