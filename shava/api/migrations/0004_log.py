# Generated by Django 2.2.8 on 2020-03-22 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_error_ustavki'),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('Time', models.DateTimeField(auto_now_add=True, db_index=True, primary_key=True, serialize=False, verbose_name='Time')),
                ('Type', models.CharField(max_length=20, verbose_name='Type')),
                ('Marker', models.CharField(choices=[('s', 'Start'), ('f', 'Finish')], max_length=1)),
            ],
        ),
    ]
