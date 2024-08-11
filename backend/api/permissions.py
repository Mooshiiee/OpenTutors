from rest_framework import permissions
from django.core.exceptions import ObjectDoesNotExist
from .models import UserProfile, Tutor  # Import your Student and Tutor models

class IsStudentOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return UserProfile.objects.filter(user=request.user).exists()

    def has_object_permission(self, request, view, obj):
        try:
            return obj.student.user == request.user
        except AttributeError:
            return False

class IsTutorOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return Tutor.objects.filter(user=request.user).exists()

    def has_object_permission(self, request, view, obj):
        try:
            return obj.tutor.user == request.user
        except AttributeError:
            return False