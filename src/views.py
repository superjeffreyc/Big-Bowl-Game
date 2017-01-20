from django.shortcuts import render
from django.http import HttpResponse
from django.utils.crypto import get_random_string
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
from django.views.decorators.csrf import csrf_exempt

import random
from .models import Room
from .models import WordBank

homeURL = "https://bigbowl.herokuapp.com/"

# Create your views here.
def index(request):
    return render(request, 'index.html')

def lobby(request, roomCode = None):

    # If coming from the start screen or if the room code is invalid, create a new room code
    if roomCode == "newgame":
        randomString = get_random_string(length=6, allowed_chars='0123456789')

        # Verify that this room code is unique
        while len(Room.objects.all().filter(code = randomString)) >= 1:
            randomString = get_random_string(length=6, allowed_chars='0123456789')

        # Create the actual room
        room = Room(code = randomString)
        room.save()

        return redirect('lobby', roomCode = randomString)

    # Unknown room code - redirect to start screen
    elif len(Room.objects.all().filter(code = roomCode)) == 0:
        return HttpResponsePermanentRedirect(homeURL)

    # User is joining an existing room - get current word bank count
    else:
        count = Room.objects.all().filter(code = roomCode)[0].num_words
        return render(request, 'lobby.html', {'roomCode': roomCode, 'count': count})

def game(request, roomCode = None):

    # Unknown room code - redirect to start screen
    if len(Room.objects.all().filter(code = roomCode)) == 0:
        return HttpResponsePermanentRedirect(homeURL)

    # User is starting a game for an existing room
    else:
        count = Room.objects.all().filter(code = roomCode)[0].num_words
        return render(request, 'game.html', {'roomCode': roomCode, 'count': count})

def search(request, roomCode):
    if len(Room.objects.all().filter(code = roomCode)) == 1:
        return HttpResponse("Found")
    else:
        return HttpResponse("Does not exist")

def getcount(request, roomCode):
    return HttpResponse(str(Room.objects.all().filter(code = roomCode)[0].num_words))


@csrf_exempt
def addword(request):

    userWord = request.POST.get("word")
    roomCode = request.POST.get("code")

    # Create new word in WordBank model
    currentRoom = Room.objects.all().filter(code = roomCode)[0]
    newWord = WordBank(word = userWord, room = currentRoom)
    newWord.save()

    # Update word count in Room model
    currentRoom.num_words += 1
    currentRoom.save()

    return HttpResponse("Success")

def getwords(request, roomCode):

    return HttpResponse("TODO")