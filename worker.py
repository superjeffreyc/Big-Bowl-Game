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
from src.models import WordBank

# Heroku Scheduler runs this script every hour.
eight_hours_ago = timezone.now()
one_hour_ago = timezone.now()

# Update timezone info for the currently timezone-unaware datetime object
eight_hours_ago = eight_hours_ago.replace(tzinfo=pytz.UTC)
one_hour_ago = one_hour_ago.replace(tzinfo=pytz.UTC)

# Subtract hours to compare against current rooms
eight_hours_ago -= datetime.timedelta(hours=8)
one_hour_ago -= datetime.timedelta(hours=1)


# Get all rooms
rooms = Room.objects.all()

# Delete rooms that have existed for over 8 hours or rooms with no words that have existed for over 1 hour.
for currentRoom in rooms:

    if eight_hours_ago > currentRoom.creation_time or (one_hour_ago > currentRoom.creation_time and currentRoom.num_words == 0):

        words = WordBank.objects.all().filter(room = currentRoom)

        # Delete all words associated with this room first
        for word in words:
            word.delete();

        # Finally, delete the room
        currentRoom.delete()


