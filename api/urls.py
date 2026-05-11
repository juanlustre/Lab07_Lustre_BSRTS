from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user),
    path("requests/", views.submit_request),
    path("requests/view/", views.view_requests),
    path("requests/<int:id>/", views.update_request),
]