import json
from datetime import datetime

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from accounts.models import Account
from api.models.gender import Gender
from api.serializers.base_serializers import BaseDynamicSerializer
from profiles.models import Profile
from profiles.serializer import ProfileSerializer


class ProfileRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('date_of_birth', )


class AccountRegisterSerializer(serializers.ModelSerializer):
	profile = ProfileRegisterSerializer()
	gender = serializers.PrimaryKeyRelatedField(queryset=Gender.objects.all())

	class Meta:
		model = Account
		fields = ('id', 'first_name', "last_name", 'email', 'password', 'profile', 'gender')
		extra_kwargs = {
			'password': {
				'write_only': True
			},
			'id': {
				'read_only': True
			}
		}

	def create(self, validated_data):
		email = validated_data['email']
		if Account.objects.filter(email=email).exists():
			raise serializers.ValidationError({
				'email': 'Email already exists'
			})
		user = Account.objects.create_user(
			last_name=validated_data['last_name'],
			first_name=validated_data['first_name'],
			email=email,
			password=validated_data['password']
		)
		gender = validated_data.get('gender', None)
		if gender is not None:
			user.gender = gender
		else:
			user.gender = Gender.objects.get(id=1)
		date_of_birth = validated_data.get('profile').get('date_of_birth', None)
		if date_of_birth is not None:
			# Преобразование строки даты обратно в объект даты
			user.profile.date_of_birth = date_of_birth
		user.profile.save()
		user.save()
		return user


class AccountSerializer(BaseDynamicSerializer):

	class Meta:
		model = Account
		fields = "__all__"
		extra_kwargs = {'password': {
			'write_only': True
		}}

	@staticmethod
	def get_full_name(obj):
		return obj.get_fullname
