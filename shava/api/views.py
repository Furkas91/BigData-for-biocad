# Create your views here.
from rest_framework import generics
from rest_framework.response import Response

from api.models import Measure
from api.serializers import MeasureListSerializer


class ListMeasureView(generics.ListAPIView):
    serializer_class = MeasureListSerializer
    queryset = Measure.objects.all()


class RealTimeMeasureView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MeasureListSerializer


    def retrieve(self, request, *args, **kwargs):
        object = Measure.objects.latest('id')
        serializer = MeasureListSerializer(object)
        return Response(serializer.data)

#class CreateMeasureView()