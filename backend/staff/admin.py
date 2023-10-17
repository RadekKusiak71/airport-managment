from django.contrib import admin
from django.contrib import admin

from .models import Airport, Flight, Reservation
from .models import Flight

admin.site.register(Airport)
admin.site.register(Flight)
admin.site.register(Reservation)
