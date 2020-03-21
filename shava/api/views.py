# Create your views here.
from rest_framework import generics

from api.models import Measure
from api.serializers import MeasureListSerializer


class ListMeasureView(generics.ListAPIView):
    serializer_class = MeasureListSerializer
    queryset = Measure.objects.all()