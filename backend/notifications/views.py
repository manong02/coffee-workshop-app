from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework import status

# Create your views here.
class ContactView(APIView):
    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        phone = request.data.get('phone', '')
        message = request.data.get('message')
        
        if not all([first_name, last_name, email, message]):
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        full_name = f"{first_name} {last_name}"
        send_mail(
            f"New Contact Form Submission from {full_name}",
            f"Message: {message}\nPhone: {phone if phone else 'Not provided'}",
            email,
            ["admin@example.com"],
            fail_silently=True,
        )
        return Response({"message": "Message sent successfully"}, status=status.HTTP_200_OK)



