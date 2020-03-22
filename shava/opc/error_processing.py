from django.conf import settings
import django
settings.configure(DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'biocad',
        'USER': 'postgres',
        'PASSWORD': 'qwerty',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
})
django.setup()
from api.models import Measure, Ustavki, Log, Error
import time

change = False
Type = ["Pressure", "Humidity", "TempIns", "TempWork", "pH", "Weight", "FlowRate", "CO2"]
#Changes = [False]*8
All_dict = []
#Changes = []
Changes = {'Pressure': False, 'Humidity': False, "TempIns": False, "TempWork": False, "pH": False, "Weight": False, "FlowRate": False, "CO2": False}

for type in Type:
    dict = {'Type': type, 'Flag': False, 'Excess': 0}
    All_dict.append(dict)



while True:
    measure = Measure.objects.latest('Time')
    ustavka = Ustavki.objects.latest('Time')

    All_dict[0]['Excess'], All_dict[0]['Flag'] = (measure.Pressure - ustavka.Pressure) if (measure.Pressure - ustavka.Pressure) > 0 else 0, \
                     (measure.Pressure - ustavka.Pressure) > 0
    All_dict[1]['Excess'], All_dict[1]['Flag'] = (measure.Humidity - ustavka.Humidity) if (measure.Humidity - ustavka.Humidity) > 0 else 0, \
                     (measure.Humidity - ustavka.Humidity) > 0
    All_dict[2]['Excess'], All_dict[2]['Flag'] = (measure.TempIns - ustavka.TempIns) if (measure.TempIns - ustavka.TempIns) > 0 else 0, \
                     (measure.TempIns - ustavka.TempIns) > 0
    All_dict[3]['Excess'], All_dict[3]['Flag'] = (measure.TempWork - ustavka.TempWork) if (measure.TempWork - ustavka.TempWork) > 0 else 0, \
                     (measure.TempWork - ustavka.TempWork) > 0
    All_dict[4]['Excess'], All_dict[4]['Flag'] = (measure.pH - ustavka.pH) if (measure.pH - ustavka.pH) > 0 else 0, \
                     (measure.pH - ustavka.pH) > 0
    All_dict[5]['Excess'], All_dict[5]['Flag'] = (measure.Weight - ustavka.Weight) if (measure.Weight - ustavka.Weight) > 0 else 0, \
                     (measure.Weight - ustavka.Weight) > 0
    All_dict[6]['Excess'], All_dict[6]['Flag'] = (measure.FlowRate - ustavka.FlowRate) if (measure.FlowRate - ustavka.FlowRate) > 0 else 0, \
                     (measure.FlowRate - ustavka.FlowRate) > 0
    All_dict[7]['Excess'], All_dict[7]['Flag'] = (measure.CO2 - ustavka.CO2) if (measure.CO2 - ustavka.CO2) > 0 else 0, \
                     (measure.CO2 - ustavka.CO2) > 0

    if All_dict[0]['Flag'] | All_dict[1]['Flag'] | All_dict[2]['Flag'] | All_dict[3]['Flag'] | All_dict[4]['Flag'] | \
            All_dict[5]['Flag'] | All_dict[6]['Flag'] | All_dict[7]['Flag']:
        Error.objects.create(Pressure=All_dict[0]['Excess'], Humidity=All_dict[1]['Excess'], TempIns=All_dict[2]['Excess'], TempWork=All_dict[3]['Excess'], pH=All_dict[4]['Excess'],
                             Weight=All_dict[5]['Excess'], FlowRate=All_dict[6]['Excess'], CO2=All_dict[7]['Excess'])


    for dict in All_dict:
        if (not Changes[dict['Type']]) & (dict['Flag']):
            string = str(measure.Time) + " Start of " + dict['Type'] + " error. Excess " + str(dict['Excess'])
            print(string)
            Log.objects.create(Type=dict['Type'], Marker='s', Error=string)
            Changes[dict['Type']] = True

        if Changes[dict['Type']] & (not dict['Flag']):
            string = str(measure.Time) + " End of " + dict['Type'] + " error."
            print(string)
            Log.objects.create(Type=dict['Type'], Marker='s', Error=string)
            Changes[dict['Type']] = False

    time.sleep(1)
