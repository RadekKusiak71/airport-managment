from django.db import models


class Airport(models.Model):
    name = models.CharField(max_length=100)
    airport_code = models.CharField(max_length=3)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Flight(models.Model):
    departure_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='departures')
    arrival_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='arrivals')
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()

    def __str__(self):
        return f'Flight from {self.departure_airport} to {self.arrival_airport}'


class Reservation(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    reservation_date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    number_of_seats = models.PositiveIntegerField()

    def __str__(self):
        return f'Reservation for flight {self.flight} by {self.first_name} {self.last_name}'
