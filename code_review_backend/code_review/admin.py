from django.contrib import admin
from .models import CodePost, Review

@admin.register(CodePost)
class CodePostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'language', 'created_at')
    search_fields = ('title', 'author__username', 'language')
    list_filter = ('language', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('code_post', 'reviewer', 'created_at')
    search_fields = ('code_post__title', 'reviewer__username')
    list_filter = ('created_at',)
