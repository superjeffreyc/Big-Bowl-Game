from django.shortcuts import render
from django.http import HttpResponse
from django.utils.crypto import get_random_string
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect

import random
from .models import Room

homeURL = "https://bigbowl.herokuapp.com/"

# Create your views here.
def index(request):
    return render(request, 'index.html')

def lobby(request, roomCode = None):

    # If coming from the start screen or if the room code is invalid, create a new room code
    if roomCode == "newgame":
        randomString = get_random_string(length=6, allowed_chars='abcdefghijkmnopqrstuvwxyz')   # Removed lowercase L since it may be interpreted as capital I
        room = Room(code = randomString)
        room.save()
        return redirect('lobby', roomCode = randomString)
    
    # Unknown room code - redirect to start screen
    elif len(Room.objects.all().filter(code = roomCode)) == 0:
        return HttpResponsePermanentRedirect(homeURL)
    
    return render(request, 'lobby.html', {'roomCode': roomCode})
    
def search(request, roomCode):
    if len(Room.objects.all().filter(code = roomCode)) == 1:
        return HttpResponse("Found")
    else:
        return HttpResponse("Does not exist")