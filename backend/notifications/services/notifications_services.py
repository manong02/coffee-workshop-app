from django.core.mail import send_mail

class NotificationService:
    @staticmethod
    def send_booking_confirmation(booking):
        subject = "Booking Confirmation"
        message = f"Hello {booking.first_name} {booking.last_name}, your {booking.service} booking for {booking.availability.date} - {booking.availability.time} is confirmed!"
        recipient = booking.email

        send_mail(subject, message, "noreply@example.com", [recipient], fail_silently=False)