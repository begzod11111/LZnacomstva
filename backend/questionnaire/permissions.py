from rest_framework import permissions


class QuestionnaireUpdatePermissions(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		return False
