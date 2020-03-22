import datetime
import random
import time

from opcua import Server

server = Server()

url = "opc.tcp://192.168.0.104:4840"
server.set_endpoint(url)

name = "OPCUA_SIMULATION_SERVER"
addspace = server.register_namespace(name)

node = server.get_objects_node()

Param = node.add_object(addspace, "Parameters")

Temperature = Param.add_variable(addspace, "Temperature", 0.0)
Pressure = Param.add_variable(addspace, "Temperature", 0.0)
Humidity = Param.add_variable(addspace, "Temperature", 0.0)
TempIns = Param.add_variable(addspace, "Temperature", 0.0)
TempWork = Param.add_variable(addspace, "Temperature", 0.0)
pH = Param.add_variable(addspace, "Temperature", 0.0)
Weight = Param.add_variable(addspace, "Temperature", 0.0)
FlowRate = Param.add_variable(addspace, "Temperature", 0.0)
CO2 = Param.add_variable(addspace, "Temperature", 0.0)

Temperature.set_writable()
Pressure.set_writable()
Humidity.set_writable()
TempIns.set_writable()
TempWork.set_writable()
pH.set_writable()
Weight.set_writable()
FlowRate.set_writable()
CO2.set_writable()

Time = Param.add_variable(addspace, "Time", 0)
Time.set_writable()
server.start()
print("Server started at {}".format(url))

while True:
    temperature = random.uniform(10.0, 50.0)
    pressure = random.uniform(200.0, 999.0)
    humidity = random.uniform(0.0, 100.0)
    tempIns = random.uniform(10.0, 50.0)
    tempWork = random.uniform(20.0, 80.0)
    ph = random.uniform(0.0, 13.0)
    weight = random.uniform(1000.0, 5000.0)
    flowrate = random.uniform(10.0, 50.0)
    co2 = random.uniform(10.0, 50.0)

    TIME = datetime.datetime.now()

    #print(temperature, pressure, humidity, TIME)

    Temperature.set_value(temperature)
    Pressure.set_value(pressure)
    Humidity.set_value(humidity)
    TempIns.set_value(tempIns)
    TempWork.set_value(tempWork)
    pH.set_value(ph)
    Weight.set_value(weight)
    FlowRate.set_value(flowrate)
    CO2.set_value(co2)

    time.sleep(1)
