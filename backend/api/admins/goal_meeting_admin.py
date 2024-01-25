from django.contrib import admin
from api.models.goal_meeting import GoalMeeting


@admin.register(GoalMeeting)
class GoalMeetingAdmin(admin.ModelAdmin):
    pass
