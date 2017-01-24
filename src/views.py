from django.shortcuts import render
from django.http import HttpResponse
from django.utils.crypto import get_random_string
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
from django.views.decorators.csrf import csrf_exempt

import random
from .models import Room
from .models import WordBank


# Load the home page
def index(request):
    return render(request, 'index.html')

# Verify if a room exists
def search(request, roomCode):
    roomCount = len(Room.objects.all().filter(code = roomCode))

    if roomCount == 1:
        return HttpResponse("Found")
    elif roomCount == 0:
        return HttpResponse("Room " + roomCode + " does not exist")
    else:
        return HttpResponse("Error. Found multiple rooms with the same code. Please make a new game.")

# Determines how many words are in the word bank for a room
def getcount(request, roomCode):
    # Create new word in WordBank model
    rooms = Room.objects.all().filter(code = roomCode)

    # Bad room code
    if len(rooms) != 1:
        return HttpResponse('Invalid room code')

    return HttpResponse(str(rooms[0].num_words))


# Adds a word to a room
@csrf_exempt
def addword(request):

    userWord = request.POST.get("word")
    roomCode = request.POST.get("code")

    # Incorrect number arguments
    if userWord == None or roomCode == None:
        return HttpResponsePermanentRedirect('/')

    # Create new word in WordBank model
    rooms = Room.objects.all().filter(code = roomCode)

    # Bad room code
    if len(rooms) != 1:
        return HttpResponsePermanentRedirect('/')

    currentRoom = rooms[0]    # Get the first and only room

    newWord = WordBank(word = userWord, room = currentRoom)
    newWord.save()

    # Update word count in Room model
    currentRoom.num_words += 1
    currentRoom.save()

    return HttpResponse("Success")

# Returns a HttpResponse of the list of words associated with a room code
def getwords(request, roomCode):

    rooms = Room.objects.all().filter(code = roomCode)

    if len(rooms) != 1:
        return HttpResponsePermanentRedirect('/')

    currentRoom = rooms[0]
    wordList = WordBank.objects.all().filter(room = currentRoom)

    wordString = ""

    # Append each word to the string
    for wordObject in wordList:
        wordString += wordObject.word + ","

    wordString = wordString[:-1]    # Remove the trailing comma

    return HttpResponse(wordString)

# Get a new room code
@csrf_exempt
def createroom(request):
    randomString = get_random_string(length=6, allowed_chars='0123456789')

    # Verify that this room code is unique
    while len(Room.objects.all().filter(code = randomString)) >= 1:
        randomString = get_random_string(length=6, allowed_chars='0123456789')

    # Create the actual room
    room = Room(code = randomString)
    room.save()

    return HttpResponse(randomString)