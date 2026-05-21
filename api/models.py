from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

class ServiceRequest(models.Model):
    name = models.CharField(max_length=255, default="Anonymous")
    request_type = models.CharField(max_length=255)
    details = models.TextField()
    needed_time = models.DateTimeField()
    status = models.CharField(max_length=50, default="Pending")