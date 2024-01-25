from rest_framework import serializers
from rest_framework.fields import SkipField
from rest_framework.relations import PKOnlyObject

from accounts.models import Account
from api.serializers.base_serializers import DynamicSerializer
from profiles.models import Profile
from django.db import models


# class DynamicFieldsModelSerializer(serializers.ModelSerializer):
#     def __init__(self, *args, **kwargs):
#         fields = kwargs.pop('fields', None)
#         super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)
#
#         if fields:
#             allowed_fields = set(fields)
#             existing = set(self.fields.keys())
#             for field_name in existing - allowed_fields:
#                 self.fields.pop(field_name)
#
#
# class YourModelSerializer(DynamicFieldsModelSerializer):
#     class Meta:
#         model = Account
#         fields = '__all__'


class ProfileSerializer(DynamicSerializer):
	class Meta:
		model = Profile
		fields = '__all__'

