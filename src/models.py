from django.db import models

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=6)
    creation_time = models.DateTimeField('date created', auto_now_add=True, editable=False)
    num_words = models.IntegerField(editable=False, default=0)

    class Meta:
        db_table = "room"
        verbose_name_plural = "Rooms"

    def __unicode__(self):
       return self.code

class WordBank(models.Model):
    word = models.CharField(max_length=50)
    room = models.ForeignKey(Room)

    class Meta:
        db_table = "wordbank"
        verbose_name_plural = "Words"

    def __unicode__(self):
       return self.word