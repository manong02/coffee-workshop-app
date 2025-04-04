# Generated by Django 5.0.2 on 2025-04-01 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Availability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True)),
                ('time', models.TimeField(default='12:00:00')),
                ('is_booked', models.BooleanField(default=False)),
            ],
            options={
                'unique_together': {('date', 'time')},
            },
        ),
    ]
