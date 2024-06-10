from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers.choices_serializer import ColorChoicesSerializer
from profiles.models import Profile


class ColorChoicesView(APIView):
    def get(self, request, format=None):
        eyes_colors = Profile.EyeColors.choices
        hair_colors = Profile.HairColor.choices
        data = {
            'eye_colors': [
                {
                    'id': i,
                    'englishName': eyes_colors[i - 1][0],
                    'russianName': eyes_colors[i - 1][1]
                }
                for i in range(1, len(eyes_colors) + 1)
            ],
            'hair_colors': [
                {
                    'id': i,
                    'englishName': hair_colors[i - 1][0],
                    'russianName': hair_colors[i - 1][1]
                }
                for i in range(1, len(hair_colors) + 1)
            ]
        }
        serializer = ColorChoicesSerializer(data)
        return Response(serializer.data)
