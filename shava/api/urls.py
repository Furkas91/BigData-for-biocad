from django.urls import path

from api.views import ListMeasureView

urlpatterns = [
    path('all/', ListMeasureView.as_view()),
    ]