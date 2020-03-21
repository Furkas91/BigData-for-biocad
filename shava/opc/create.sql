CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE test(
  time timestamptz,
  metric text,
  value numeric);

SELECT * FROM create_hypertable('test', 'time');

SELECT * FROM create_hypertable('api_measure', 'Time', migrate_data => true);
