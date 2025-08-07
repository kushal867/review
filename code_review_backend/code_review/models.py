from django.db import models
from django.contrib.auth.models import User

class CodePost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='code_posts')
    title = models.CharField(max_length=200)
    code = models.TextField()
    language = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    code_post = models.ForeignKey(CodePost, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    suggestion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
