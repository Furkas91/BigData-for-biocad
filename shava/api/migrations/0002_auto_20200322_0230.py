# Generated by Django 2.2.8 on 2020-03-21 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='measure',
            name='id',
        ),
        migrations.AlterField(
            model_name='measure',
            name='Time',
            field=models.DateTimeField(auto_now_add=True, db_index=True, primary_key=True, serialize=False, verbose_name='Time'),
        ),
    ]