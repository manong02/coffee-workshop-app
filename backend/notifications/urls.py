from django.urls import path
from notifications.views.notifications_views import contact_form_submission


urlpatterns = [
    path('contact/', contact_form_submission, name='contact_form_submission'),
]