# Generated by Django 5.1.6 on 2025-03-20 02:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_doctor_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={},
        ),
        migrations.AlterModelTable(
            name='user',
            table='auth_user',
        ),
    ]
