from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from api.views import CustomAuthToken
from questionnaire.views import *

app_name = 'api'

urlpatterns = [
	path(
		'v1/',
		include(
			[
				path('auth/', include('djoser.urls')),
				path('auth/', include('djoser.urls.authtoken')),
				path(
					'auth/registration/',
					RegistrationQuestionnaireView.as_view(),
					name='registration'),
				path(
					'questionnaire/',
					include(
						[
							path(
								'list/',
								QuestionnaireListView.as_view(),
								name='questionnaire-list'
							),
							path(
								'update/',
								UpdateQuestionnaireView.as_view(),
								name='questionnaire-update'
							),
							path(
								'<slug:user_slug>/',
								DetailQuestionnaireView.as_view(),
								name='questionnaire'
							),
						]
					)
				)
			]
		),
	),
]

# [
#
