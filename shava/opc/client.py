from django.apps import apps


from django.conf import settings
import django
settings.configure(DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'qwerty',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
})
django.setup()
#apps.get_app_config('admin').verbose_name
from opcua import Client
import time
import psycopg2
import psycopg2.extras
import os


def client():
    #os.environ["DJANGO_SETTINGS_MODULE"] = "shava.shava.settings"

    from api.models import Measure

    #################################################################

    #################################################################



    url = "opc.tcp://172.18.8.26:4840"
    client = Client(url)

    client.connect()
    print("Client is connected")

    while True:
        temperature = client.get_node("ns=2;i=2")
        Temperature = temperature.get_value()
        #print(Temperature)

        pressure = client.get_node("ns=2;i=3")
        Pressure = pressure.get_value()
        #print(Pressure)

        humidity = client.get_node("ns=2;i=4")
        Humidity = humidity.get_value()

        tempIns = client.get_node("ns=2;i=5")
        TempIns = tempIns.get_value()

        tempWork = client.get_node("ns=2;i=6")
        TempWork = tempWork.get_value()

        ph = client.get_node("ns=2;i=7")
        pH = ph.get_value()

        weight = client.get_node("ns=2;i=8")
        Weight = weight.get_value()

        flowrate = client.get_node("ns=2;i=9")
        FlowRate = flowrate.get_value()

        co2 = client.get_node("ns=2;i=10")
        CO2 = co2.get_value()

        Measure.objects.create(Pressure=Pressure, Humidity=Humidity, TempIns=TempIns, TempWork=TempWork,
                       pH=pH, Weight=Weight, FlowRate=FlowRate, CO2=CO2)

        time.sleep(1)


client()
