from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Booking

@api_view(['GET'])
def get_services(request):
    return Response({"services": [dict(key=key, label=label) for key, label in Booking.SERVICES]})