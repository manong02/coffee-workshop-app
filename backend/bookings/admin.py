from django.contrib import admin
from .models.bookings_models import Booking

# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'service', 'availability')
    list_filter = ('service', 'availability')
    search_fields = ('first_name', 'last_name', 'email')
    ordering = ('-availability',)
