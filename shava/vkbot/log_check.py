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

id = 0

def check_log():
    global id
    log = Log.objects.latest('Time')
    while log.id != log:
        log = Log.objects.latest('Time')
        #if log.id != id:
        id = log.id
        print(log.id, " ", id)
        print(log.Error)
        return log.Error
#
while True:
    check_log()
