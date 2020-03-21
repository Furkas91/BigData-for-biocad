from infi.clickhouse_orm.database import Database
from infi.clickhouse_orm.models import Model
from infi.clickhouse_orm.fields import *
from infi.clickhouse_orm.engines import Memory

class CPUStats(Model):

    timestamp = DateTimeField()
    cpu_id = UInt16Field()
    cpu_percent = Float32Field()

    engine = Memory()

db = Database('demo', username="default", password="2718281828")
db.create_table(CPUStats)

import psutil, time, datetime

psutil.cpu_percent(percpu=True) # first sample should be discarded
k=0
while True:
    k += 1
    time.sleep(1)
    stats = psutil.cpu_percent(percpu=True)
    timestamp = datetime.datetime.now()
    db.insert([
        CPUStats(timestamp=timestamp, cpu_id=cpu_id, cpu_percent=cpu_percent)
        for cpu_id, cpu_percent in enumerate(stats)
    ])

    total = CPUStats.objects_in(db).filter(cpu_id=1).count()
    busy = CPUStats.objects_in(db).filter(cpu_id=1, cpu_percent__gt=95).count()
    print('CPU 1 was busy {:.2f}% of the time'.format(busy * 100.0 / total))

    # Calculate the average usage per CPU
    for row in CPUStats.objects_in(db).aggregate('cpu_id', average='avg(cpu_percent)'):
        print('CPU {row.cpu_id}: {row.average:.2f}%'.format(row=row))


