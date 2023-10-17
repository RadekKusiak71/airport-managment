from django.core.management.base import BaseCommand
from datetime import datetime
from staff.models import Flight


class Command(BaseCommand):
    help = 'Delete outdated flights'

    def handle(self, *args, **kwargs):
        now = datetime.now()
        flights_to_delete = Flight.objects.filter(arrival_date__lt=now)
        flights_to_delete.delete()
        self.stdout.write(self.style.SUCCESS('Successfully deleted flights.'))
