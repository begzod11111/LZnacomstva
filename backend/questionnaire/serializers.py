from rest_framework import serializers
from django.contrib.auth.models import User
from slugify import slugify




#
# class ImageSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Image
# 		fields = ('id', 'image', 'is_main')
#
#
# class CountrySerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Country
# 		fields = ('id', 'name', 'slug', 'flag')
#
#
# class ProfileListItemSerializer(serializers.ModelSerializer):
# 	images = ImageSerializer(many=True, read_only=True)
# 	country = CountrySerializer(read_only=True)
#
# 	class Meta:
# 		model = Profile
# 		fields = (
# 			'images',
# 			'age',
# 			'country'
# 		)
#
#
# class UserListItemSerializer(serializers.ModelSerializer):
# 	profile = ProfileListItemSerializer(read_only=True)
#
# 	class Meta:
# 		model = User
# 		fields = ('id', 'username', 'profile')
#
#
# class UserDetailSerializer(serializers.ModelSerializer):
#
# 	class Meta:
# 		model = User
# 		fields = ('username', 'date_joined', 'email')
#
#
# class ProfileDetailSerializer(serializers.ModelSerializer):
# 	user = UserDetailSerializer(read_only=True)
# 	images = ImageSerializer(read_only=True, many=True)
#
# 	class Meta:
# 		model = Profile
# 		fields = (
# 			'slug',
# 			'age',
# 			'about_me',
# 			'gender',
# 			'height',
# 			'weight',
# 			'eye_color',
# 			'hair_color',
# 			'images',
# 			'user',
# 		)
#
#
# class ProfileRegisterSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Profile
# 		fields = (
# 			'gender',
# 			'date_of_birth',
# 		)
#
#
# class UserRegisterSerializer(serializers.ModelSerializer):
# 	profile = ProfileRegisterSerializer()
#
# 	class Meta:
# 		model = User
# 		fields = ('username', 'email', 'password', 'profile')
# 		extra_kwargs = {'password': {
# 			'write_only': True
# 		}}
#
# 	def create(self, validated_data):
# 		email = validated_data['email']
# 		if User.objects.filter(email=email).exists():
# 			raise serializers.ValidationError({
# 				'email': 'Email already exists'
# 			})
# 		user = User.objects.create_user(
# 			email=email,
# 			username=validated_data['username'],
# 			password=validated_data['password']
# 		)
# 		user.profile.gender = validated_data['profile'].get('gender', Gender.objects.get(id=1))
# 		user.profile.date_of_birth = validated_data['profile'].get('date_of_birth', None)
# 		user.profile.save()
# 		return user
#
#
# class PurposeOfDatingSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = PurposeOfDating
# 		fields = '__all__'
#
#
# class MyUserProfileSerializer(serializers.ModelSerializer):
# 	images = ImageSerializer(many=True, read_only=True)
#
# 	class Meta:
# 		model = Profile
# 		fields = ('slug', 'get_fullname', 'images')
