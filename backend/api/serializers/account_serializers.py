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


class GenderRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Gender
		fields = ('id', )


class AccountRegisterSerializer(serializers.ModelSerializer):
	profile = ProfileRegisterSerializer()
	gender = GenderRegisterSerializer()

	class Meta:
		model = Account
		fields = ('id', 'first_name', 'email', 'password', 'profile', 'gender')
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
		full_name = validated_data['first_name'].split(' ')
		user = Account.objects.create_user(
			last_name=full_name[0],
			first_name=full_name[1],
			email=email,
			password=validated_data['password']
		)
		gender_id = validated_data.get('gender').get('id', None)
		if gender_id is not None:
			gender = Gender.objects.get(id=gender_id)
			user.gender = gender
		else:
			user.gender = Gender.objects.get(id=1)
		user.profile.date_of_birth = validated_data['profile'].get('date_of_birth', None)
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
