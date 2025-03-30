from rest_framework import serializers
from ..models.bookings_models import Booking

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        
    def validate_availability(self, value):
        if Booking.objects.filter(availability=value).exists():
            raise serializers.ValidationError("This availability is already taken.")
        return value