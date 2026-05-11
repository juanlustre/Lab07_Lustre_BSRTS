from django.http import JsonResponse
from .models import User, ServiceRequest
from django.views.decorators.csrf import csrf_exempt
import json

# REGISTER USER
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        User.objects.create(
            name=data["name"],
            email=data["email"],
            password=data["password"]
        )

        return JsonResponse({
            "status": "success",
            "message": "User registered successfully"
        })


# SUBMIT SERVICE REQUEST
@csrf_exempt
def submit_request(request):
    if request.method == "POST":
        data = json.loads(request.body)

        ServiceRequest.objects.create(
            user_id=data["user_id"],
            request_type=data["request_type"]
        )

        return JsonResponse({
            "status": "success",
            "message": "Request submitted successfully"
        })


# VIEW SERVICE REQUESTS
@csrf_exempt
def view_requests(request):
    requests = list(ServiceRequest.objects.values())
    return JsonResponse(requests, safe=False)


# PROCESS REQUEST (ADMIN)
@csrf_exempt
def update_request(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)

        req = ServiceRequest.objects.get(id=id)
        req.status = data["status"]
        req.save()

        return JsonResponse({
            "status": "success",
            "message": "Request updated successfully"
        })