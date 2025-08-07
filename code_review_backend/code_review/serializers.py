from rest_framework import serializers
from .models import CodePost, Review
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'suggestion', 'created_at']

class CodePostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = CodePost
        fields = ['id', 'author', 'title', 'code', 'language', 'description', 'created_at', 'reviews']
