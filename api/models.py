from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)

class ServiceRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request_type = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default="Pending")