from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from questionnaire.models import Profile


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
