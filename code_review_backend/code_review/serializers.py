from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CodePost, Review

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ("id", "reviewer", "suggestion", "created_at")
        read_only_fields = ("id", "reviewer", "created_at")


class CodePostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = CodePost
        fields = (
            "id",
            "author",
            "title",
            "code",
            "language",
            "description",
            "created_at",
            "reviews",
        )
        read_only_fields = ("id", "author", "created_at")
