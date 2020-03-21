from rest_framework import serializers

from api.models import Measure


class MeasureListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measure
        fields = "__all__"