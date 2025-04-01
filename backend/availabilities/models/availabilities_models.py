from django.db import models
from django.core.mail import send_mail
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.utils.timezone import now


class Availability(models.Model):
    date = models.DateField(unique=True)
    time = models.TimeField(default="12:00:00")
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ['date', 'time']
    
    def __str__(self):
        return f"{self.date} - {self.time} - {self.is_booked}"