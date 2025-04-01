from django.contrib import admin
from .models.availabilities_models import Availability

# Register your models here.

@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'is_booked')
    list_filter = ('date', 'is_booked')
    search_fields = ('date',)
    ordering = ('date', 'time')
