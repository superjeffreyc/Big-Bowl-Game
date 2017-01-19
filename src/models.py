from django.db import models

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=6)
    creation_time = models.DateTimeField('date created', auto_now_add=True, editable=False)

    class Meta:
        db_table = "room"
        verbose_name_plural = "Rooms"

    def __unicode__(self):
       return self.code
       