from django.urls import path

from api.views import *

urlpatterns = [
    path('all/', ListMeasureView.as_view()),
    path('rt/', RealTimeMeasureView.as_view()),
    path('lastust/', RetrieveUstavkaView.as_view()),
    path('updateust/', CreateUstavkaView.as_view()),
    path('logs/', ListLogsView.as_view()),
    path('tlogs/', ListTLogsView.as_view())
    ]