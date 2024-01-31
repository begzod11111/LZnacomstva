from django.urls import path, include
from rest_framework import routers

from accounts.views import AccountViewSet
from api.views.country_viewsets import CountryViewSet
from api.views.goal_meeting_views import GoalMeetingViewSet

router = routers.SimpleRouter()

router.register(r'country', CountryViewSet, basename='country')
router.register(r'goal-meeting', GoalMeetingViewSet, basename='goal-meeting')
router.register(r'accounts', AccountViewSet, basename='account')


app_name = 'api'

urlpatterns = [
	path('v1/', include(router.urls))
]
