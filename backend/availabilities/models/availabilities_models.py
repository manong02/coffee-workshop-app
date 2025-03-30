from django.db import models
from django.core.mail import send_mail
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.utils.timezone import now


class Availability(models.Model):
    datetime = models.DateField(unique=True)
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.datetime} - {self.is_available}"