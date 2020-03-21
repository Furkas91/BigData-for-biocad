from django.db import models

class Measure(models.Model):
    Time = models.DateTimeField(verbose_name='Time', auto_now_add=True, db_index=True)
    Pressure = models.FloatField(verbose_name='Pressure')
    Humidity = models.FloatField(verbose_name='Humidity')
    TempIns = models.FloatField(verbose_name='TempIns')
    TempWork = models.FloatField(verbose_name='TempWork')
    pH = models.FloatField(verbose_name='pH')
    Weight = models.FloatField(verbose_name='Weight')
    FlowRate = models.FloatField(verbose_name='FlowRate')
    CO2 = models.FloatField(verbose_name='CO2')
# Create your models here.
