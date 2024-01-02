from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import TokenObtainPairSerializer

# Create your views here.


class CustomAuthToken(ObtainAuthToken):
    serializer_class = TokenObtainPairSerializer
