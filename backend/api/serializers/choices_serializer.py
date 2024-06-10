from rest_framework import serializers


class ColorChoicesSerializer(serializers.Serializer):
    eye_colors = serializers.ListField(child=serializers.DictField())
    hair_colors = serializers.ListField(child=serializers.DictField())