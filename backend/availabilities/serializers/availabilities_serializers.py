from rest_framework import serializers
from ..models.availabilities_models import Availability

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'
    def validate(self, attrs):
        if Booking.objects.filter(availability=attrs['id']).exists():
            raise serializers.ValidationError("This availability is already taken.")
        return attrs