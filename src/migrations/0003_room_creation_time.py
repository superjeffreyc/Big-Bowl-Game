# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-01-19 05:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_auto_20170118_1503'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='creation_time',
            field=models.DateTimeField(auto_now_add=True, default='2017-01-19 05:46:38.424502+00', verbose_name=b'date created'),
            preserve_default=False,
        ),
    ]