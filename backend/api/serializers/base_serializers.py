from collections import OrderedDict
from backend import settings
from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework.serializers import ModelSerializer


class TokenObtainPairSerializer(serializers.Serializer):
	email = serializers.CharField(
		label=_("Email"),
		write_only=True
	)
	password = serializers.CharField(
		label=_("Password"),
		style={'input_type': 'password'},
		trim_whitespace=False,
		write_only=True
	)
	token = serializers.CharField(
		label=_("Token"),
		read_only=True
	)

	def validate(self, attrs):
		email = attrs.get('email')
		password = attrs.get('password')

		if email and password:
			try:
				user = User.objects.get(email=email)
			except User.DoesNotExist:
				msg = _('There is no user with this email, check your email and password')
				raise serializers.ValidationError(msg, code='authorization')
			is_true_password = user.check_password(password)
			if not is_true_password:
				msg = _('Wrong password. Please try again')
				raise serializers.ValidationError(msg, code='authorization')
		else:
			msg = _('Must include "email" and "password".')
			raise serializers.ValidationError(msg, code='authorization')

		attrs['user'] = user
		return attrs


class DynamicFieldsSerializer(serializers.Serializer):

	def __init__(self, *args, **kwargs):
		self.dynamic_fields = kwargs.pop('dynamic_fields', None)
		super().__init__(*args, **kwargs)

	def get_fields(self):
		fields = super().get_fields()
		if self.dynamic_fields is not None:
			new_fields = OrderedDict()
			for field_name, fields_item in fields.items():
				if field_name in self.dynamic_fields:
					new_fields[field_name] = fields_item
			fields.clear()
			fields.update(new_fields)

		return fields


class DynamicRelationsSerializer(serializers.Serializer):
	def __init__(self, *args, **kwargs):
		self.dynamic_relations = kwargs.pop('dynamic_relations', None)
		super().__init__(*args, **kwargs)

		if self.dynamic_relations is not None:
			for field_name, field in self.dynamic_relations.items():
				self.fields[field_name] = field


class BaseDynamicSerializer(
	DynamicRelationsSerializer,
	DynamicFieldsSerializer, ModelSerializer):
	"""
	Base dynamic serializer class for models
	"""
	@staticmethod
	def get_absolute_media_url(relative_path):
		domain = settings.ALLOWED_HOSTS[0]
		scheme = settings.SCHEME
		return f'{scheme}://{domain}:8000/{relative_path}'
