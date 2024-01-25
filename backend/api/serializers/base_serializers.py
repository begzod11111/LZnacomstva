from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _


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


class DynamicSerializer(serializers.ModelSerializer):

	def __init__(self, dynamic_fields=None, dynamic_relations=None, *args, **kwargs):
		self.dynamic_fields = dynamic_fields
		self.dynamic_relations = dynamic_relations
		super().__init__(*args, **kwargs)
		if self.dynamic_fields is None:
			self.dynamic_fields = (field_name for field_name in self.fields.keys())

	# if self.dynamic_relations is not None:
	# 	for field_name, relation in self.dynamic_relations.items():
	# 		if any(field_name == field for field in self.fields.keys()):
	# 			self.fields[field_name] = relation

	@property
	def _readable_fields(self):
		for field_name, field in self.fields.items():
			if not field.write_only and field_name in self.dynamic_fields:
				yield field

	# @staticmethod
	# def get_attribute_field(instance, field_name, many=False):
	# 	attr = None
	# 	try:
	# 		if many:
	# 			attr = getattr(instance, field_name).all()
	# 		else:
	# 			attr = getattr(instance, field_name)
	# 	except AttributeError:
	# 		print(f'No field model {instance} {field_name}')
	# 	return attr

	# def add_fields(self, instance):
	# 	data = {}
	#
	# 	if self.dynamic_relations is not None:
	# 		for field_name, field_data in self.dynamic_relations.items():
	# 			many = field_data.get('many', False)
	# 			attr = self.get_attribute_field(
	# 				instance,
	# 				field_name,
	# 				many=many
	# 			)
	# 			data[field_name] = field_data['serializer'](
	# 				instance=attr,
	# 				dynamic_fields=field_data.get('dynamic_fields', set()),
	# 				many=many
	# 			).data
	# 	return data

	# def to_representation(self, instance):
	# 	data = super().to_representation(instance)
	# 	data.update(self.add_fields(instance))
	# 	return data
