from opcua import Client
import time

url = "opc.tcp://192.168.0.103:4840"

client = Client(url)

client.connect()
print("Client is connected")

while True:
    Temp = client.get_node("ns=2;i=2")
    Temperature = Temp.get_value()
    print(Temperature)

    Press = client.get_node("ns=2;i=3")
    Pressure = Press.get_value()
    print(Pressure)

    TIME = client.get_node("ns=2;i=4")
    TIME_Value = TIME.get_value()
    print(TIME)

    time.sleep(1)
