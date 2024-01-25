from django.urls import path, include
from djoser.views import UserViewSet
from rest_framework import routers
from rest_framework.authtoken import views

from accounts.views import AccountViewSet
from questionnaire.views import *

app_name = 'api'

router = routers.DefaultRouter()
# router.register(r'questionnaire', QuestionnaireViewSet, basename='questionnaire')

urlpatterns = [
	path('test/', AccountViewSet.as_view({'get': 'list'}), name='test')
]

# 	path(
# 		'v1/',
# 		include(
# 			[
# 				path('auth/', include('djoser.urls')),
# 				path('auth/', include('djoser.urls.authtoken')),
# 				path('purpose-of-dating/', PurposeOfDatingViewSet.as_view({'get': 'list'})),
# 				path('purpose-of-dating/<slug:cat_slug>/', PurposeOfDatingViewSet.as_view(
# 					{'get': 'retrieve'}
# 				)),
# 				path('', include(router.urls))
# 			]
# 		),
# 	),
# ]
