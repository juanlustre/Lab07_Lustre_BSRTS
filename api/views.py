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
        try:
            data = json.loads(request.body)

            ServiceRequest.objects.create(
                name=data.get("name", "Anonymous"),   
                request_type=data.get("request_type"),
                details=data.get("details"),
                needed_time=data.get("needed_time"),
                status="Pending"
            )

            return JsonResponse({
                "status": "success",
                "message": "Request submitted successfully"
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            }, status=400)

    return JsonResponse({
        "status": "error",
        "message": "Invalid request method"
    }, status=405)

# VIEW ALL SERVICE REQUESTS
from django.http import JsonResponse
from .models import ServiceRequest

def view_requests(request):
    requests = list(ServiceRequest.objects.values(
        "id",
        "name",
        "request_type",
        "details",
        "needed_time",
        "status"
    ))

    return JsonResponse(requests, safe=False)

@csrf_exempt
def update_request(request, id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)

            req = ServiceRequest.objects.get(id=id)
            req.status = data.get("status")
            req.save()

            return JsonResponse({
                "status": "success",
                "message": "Request updated successfully"
            })

        except ServiceRequest.DoesNotExist:
            return JsonResponse({
                "status": "error",
                "message": "Request not found"
            }, status=404)