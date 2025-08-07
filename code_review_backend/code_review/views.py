from rest_framework import viewsets, permissions
from .models import CodePost, Review
from .serializers import CodePostSerializer, ReviewSerializer

class CodePostViewSet(viewsets.ModelViewSet):
    queryset = CodePost.objects.all().order_by('-created_at')
    serializer_class = CodePostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)
