# Generated by Django 4.1.1 on 2022-09-20 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0006_auto_20170122_1617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='creation_time',
            field=models.DateTimeField(auto_now_add=True, verbose_name='date created'),
        ),
    ]