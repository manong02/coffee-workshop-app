from django.urls import path, include
from rest_framework import routers
from .views.availabilities_views import AvailabilityViewSet

router = routers.DefaultRouter()
router.register(r'', AvailabilityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]