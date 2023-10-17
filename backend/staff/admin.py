from django.contrib import admin

from .models import Airport, Flight, Reservation

admin.site.register(Airport)
admin.site.register(Flight)
admin.site.register(Reservation)
