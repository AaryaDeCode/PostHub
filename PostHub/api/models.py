from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    company_name = models.CharField(max_length=100)  
    role = models.CharField(max_length=100)  
    experience = models.TextField()  
    author = models.CharField(max_length=100)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  
    photos = models.ImageField(upload_to="interview_photos/", blank=True, null=True)  

    def __str__(self):
        return f"{self.company_name} Interview experienced by {self.author} who got role of {self.role}"
