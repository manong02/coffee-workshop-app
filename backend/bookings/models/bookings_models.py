from django.db import models
from django.core.mail import send_mail
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.timezone import now
from availabilities.models import Availability

class Booking(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    availability = models.OneToOneField(Availability, on_delete=models.CASCADE)
    confirmed = models.BooleanField(default=False)
    
    SERVICES = [
        ('latte_art', 'Latte Art'),
        ('espresso_mastery', 'Espresso Mastery'),
        ('home_brewing', 'Home Brewing')
    ]

    service = models.CharField(max_length=255, choices=SERVICES)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.availability}"