from rest_framework import serializers
from accounts.models import Account
from api.models.gender import Gender
from profiles.models import Profile
from profiles.serializer import ProfileSerializer
from api.serializers import base_serializers


class ProfileRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = ('gender', 'date_of_birth')


class AccountRegisterSerializer(serializers.ModelSerializer):
	profile = ProfileRegisterSerializer()

	class Meta:
		model = Account
		fields = ('id', 'first_name', 'email', 'password', 'profile')
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
		user.profile.gender = validated_data['profile'].get('gender', Gender.objects.get(id=1))
		user.profile.date_of_birth = validated_data['profile'].get('date_of_birth', None)
		user.profile.save()
		return user


class AccountSerializer(base_serializers.DynamicSerializer):
	profile = ProfileSerializer(dynamic_fields=('age', 'gender', 'date_of_birth'))

	class Meta:
		model = Account
		fields = "__all__"
