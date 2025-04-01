from django.db import models
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.utils.timezone import now
from ..models.availabilities_models import Availability
from bookings.models import Booking
from ..serializers.availabilities_serializers import AvailabilitySerializer


class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all() 
    serializer_class = AvailabilitySerializer

    @action(detail=True, methods=['post'])
    def book(self, request, pk=None):
        availability = self.get_object()
        if Booking.objects.filter(availability=availability).exists():
            return Response({"error": "This availability is already taken."}, status=status.HTTP_400_BAD_REQUEST)

        Booking.objects.create(availability=availability, confirmed=False)
        availability.is_booked = True  
        availability.save()  

        return Response({"message": "Booking successful."}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        availability = self.get_object()
        if Booking.objects.filter(availability=availability).exists():
            return Response({"error": "This availability is already taken."}, status=status.HTTP_400_BAD_REQUEST)

        Booking.objects.create(availability=availability, confirmed=True)
        availability.is_booked = True  
        availability.save()  

        return Response({"message": "Booking confirmed."}, status=status.HTTP_201_CREATED)
