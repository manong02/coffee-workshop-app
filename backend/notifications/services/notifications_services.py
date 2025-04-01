from django.core.mail import send_mail

class NotificationService:
    @staticmethod
    def send_booking_confirmation(booking):
        subject = "Booking Confirmation"
        message = f"Hello {booking.first_name} {booking.last_name}, your {booking.service} booking for {booking.availability.date} - {booking.availability.time} is confirmed!"
        recipient = booking.email

        send_mail(subject, message, "noreply@example.com", [recipient], fail_silently=False)

    @staticmethod
    def send_contact_form_email(first_name, last_name, email, phone_number, message):
        subject = f"New Contact Form Submission from {first_name} {last_name}"
        message_body = f"""
        First Name: {first_name}
        Last Name: {last_name}
        Email: {email}
        Phone Number: {phone_number if phone_number else "Not provided"}

        Message: 
        {message}
        """
        recipient = "spressoworkshop@gmail.com"

        send_mail(subject, message_body, "noreply@example.com", [recipient], fail_silently=False)