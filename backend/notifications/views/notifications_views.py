from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from notifications.services.notifications_services import NotificationService

@csrf_exempt
def contact_form_submission(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            first_name = data.get("firstName")
            last_name = data.get("lastName")
            email = data.get("email")
            phone_number = data.get("phoneNumber", "")
            message = data.get("message")

            if not first_name or not last_name or not email or not message:
                return JsonResponse({"error":"All required fields must be filled"}, status=400)
            
            NotificationService.send_contact_form_email(first_name, last_name, email, phone_number, message)
            return JsonResponse({'success': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)