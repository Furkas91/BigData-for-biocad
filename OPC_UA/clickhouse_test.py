from clickhouse_driver import Client

client = Client('localhost', password="2718281828")

result = client.execute('SELECT now(), version()')
print("RESULT: {0}: {1}".format(type(result), result))
for t in result:
    print(" ROW: {0}: {1}".format(type(t), t))
    for v in t:
        print("  COLUMN: {0}: {1}".format(type(v), v))

