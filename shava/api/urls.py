from django.urls import path

from api.views import *

urlpatterns = [
    path('all/', ListMeasureView.as_view()),
    path('rt/', RealTimeMeasureView.as_view())
    ]