from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models.bookings_models import Booking
from ..serializers.bookings_serializers import BookingSerializer
from notifications.services.notifications_services import NotificationService
from django.shortcuts import get_object_or_404
from availabilities.models import Availability

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    @action(detail=False, methods=['get'])
    def availables_times(self, request):
        booked_slots = Booking.objects.values_list('availability', flat=True)
        return Response({'booked_slots':booked_slots})

    def perform_create(self, serializer):
        availability_id = self.request.data.get('availability')

        if availability_id:
            availability_instance = get_object_or_404(Availability, id=availability_id)
            
            # Mark the availability as booked
            availability_instance.is_booked = True
            availability_instance.save()
            
            booking = serializer.save(availability=availability_instance)
            NotificationService.send_booking_confirmation(booking)