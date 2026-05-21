from django.urls import path
from . import views
from .views import update_request

urlpatterns = [
    path("register/", views.register_user),
    path("requests/", views.submit_request),
    path("requests/view/", views.view_requests),
    path("requests/<int:id>/", views.update_request),
    path('requests/<int:id>/', update_request),
]