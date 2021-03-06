from django.db import models


class Measure(models.Model):
    class Meta:
        app_label = 'api'
    Time = models.DateTimeField(verbose_name='Time', auto_now_add=True, db_index=True, primary_key=True)
    Pressure = models.FloatField(verbose_name='Pressure')
    Humidity = models.FloatField(verbose_name='Humidity')
    TempIns = models.FloatField(verbose_name='TempIns')
    TempWork = models.FloatField(verbose_name='TempWork')
    pH = models.FloatField(verbose_name='pH')
    Weight = models.FloatField(verbose_name='Weight')
    FlowRate = models.FloatField(verbose_name='FlowRate')
    CO2 = models.FloatField(verbose_name='CO2')



class Ustavki(models.Model):
    class Meta:
        app_label = 'api'
    Time = models.DateTimeField(verbose_name='Time', auto_now_add=True, db_index=True, primary_key=True)
    Pressure = models.FloatField(verbose_name='Pressure')
    Humidity = models.FloatField(verbose_name='Humidity')
    TempIns = models.FloatField(verbose_name='TempIns')
    TempWork = models.FloatField(verbose_name='TempWork')
    pH = models.FloatField(verbose_name='pH')
    Weight = models.FloatField(verbose_name='Weight')
    FlowRate = models.FloatField(verbose_name='FlowRate')
    CO2 = models.FloatField(verbose_name='CO2')


class Error(models.Model):
    class Meta:
        app_label = 'api'
    Time = models.DateTimeField(verbose_name='Time', auto_now_add=True, db_index=True, primary_key=True)
    Pressure = models.FloatField(verbose_name='Pressure')
    Humidity = models.FloatField(verbose_name='Humidity')
    TempIns = models.FloatField(verbose_name='TempIns')
    TempWork = models.FloatField(verbose_name='TempWork')
    pH = models.FloatField(verbose_name='pH')
    Weight = models.FloatField(verbose_name='Weight')
    FlowRate = models.FloatField(verbose_name='FlowRate')
    CO2 = models.FloatField(verbose_name='CO2')


class Log(models.Model):
    class Meta:
        app_label = 'api'
    Time = models.DateTimeField(verbose_name='Time', auto_now_add=True, db_index=True)
    Type = models.CharField(max_length=20, verbose_name="Type")
    MARKER = [('s', "Start"), ('f', "Finish")]
    Marker = models.CharField(max_length=1, choices=MARKER)
    Error = models.CharField(max_length=100, verbose_name="Log", default="", null=True, editable=False)
# Create your models here.
