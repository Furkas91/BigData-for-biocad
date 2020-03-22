# Create your views here.
from rest_framework import generics
from rest_framework.response import Response

from api.models import Measure, Ustavki, Log
from api.serializers import MeasureListSerializer, UstavkaDefaultSerializer, LoggerSerializer, TLoggerSerializer


class ListMeasureView(generics.ListAPIView):
    serializer_class = MeasureListSerializer
    queryset = Measure.objects.all()


class RealTimeMeasureView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MeasureListSerializer


    def retrieve(self, request, *args, **kwargs):
        object = Measure.objects.latest('Time')
        serializer = MeasureListSerializer(object)
        return Response(serializer.data)


class CreateUstavkaView(generics.CreateAPIView):
    serializer_class = UstavkaDefaultSerializer


class RetrieveUstavkaView(generics.RetrieveAPIView):
    serializer_class = UstavkaDefaultSerializer

    def retrieve(self, request, *args, **kwargs):
        object = Ustavki.objects.latest('Time')
        serializer = UstavkaDefaultSerializer(object)
        return Response(serializer.data)


class ListLogsView(generics.ListAPIView):
    serializer_class = LoggerSerializer
    queryset = Log.objects.all()


class ListTLogsView(generics.ListAPIView):
    serializer_class = TLoggerSerializer
    queryset = Log.objects.all()


#class CreateMeasureView()