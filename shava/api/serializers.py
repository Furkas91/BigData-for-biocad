from rest_framework import serializers

from api.models import Measure, Ustavki, Error, Log


class MeasureListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measure
        fields = "__all__"


class UstavkaDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ustavki
        fields = "__all__"

#
#class UstavkaDetailSerializer(UstavkaDefaultSerializer):
#    Time = serializers.HiddenField()


class ErrorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Error
        fields = "__all__"


class LoggerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = "__all__"


class TLoggerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ['Error']