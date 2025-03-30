from django.urls import path, include
from rest_framework import routers
from .views.bookings_views import BookingViewSet

router = routers.DefaultRouter()
router.register(r'', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]