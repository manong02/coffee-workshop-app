from django.db import models
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.utils.timezone import now
from ..models.bookings_models import Booking
from ..serializers.bookings_serializers import BookingSerializer
from availabilities.models import Availability

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    @action(detail=False, methods=['get'])
    def availables_times(self, request):
        booked_slots = Booking.objects.values_list('availability', flat=True)
        return Response({'booked_slots':booked_slots})

    def perform_create(self, serializer):
        serializer.save(availability=self.request.data['availability'])
        send_mail(
            "Booking Confirmation",
            f"Hello {booking.first_name} {booking.last_name}, your {booking.service} booking for {booking.availabilities.datetime} is confirmed!",
            "noreply@exmaple.com",
            [booking.email],
            fail_silently=True,
        )