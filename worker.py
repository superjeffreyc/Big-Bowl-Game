# This script removes rooms that have existed for over 24 hours

import django
import os
import time
import datetime
from django.utils import timezone
import pytz

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from src.models import Room

# Heroku Scheduler runs this script everyday at midnight UTC.
currentTime = timezone.now()

# Update timezone info for the currently timezone-unaware datetime object
currentTime = currentTime.replace(tzinfo=pytz.UTC)

# Subtract 24 hours to compare against current rooms 
currentTime -= datetime.timedelta(hours=24)

# Get all rooms
rooms = Room.objects.all()

# Delete rooms that have existed for over 24 hours
for room in rooms:
    if currentTime > room.creation_time:
        room.delete()


