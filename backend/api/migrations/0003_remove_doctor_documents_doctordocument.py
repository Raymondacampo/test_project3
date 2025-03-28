# Generated by Django 5.1.6 on 2025-03-28 02:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_passwordresettoken'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doctor',
            name='documents',
        ),
        migrations.CreateModel(
            name='DoctorDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='doctor_documents/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='api.doctor')),
            ],
        ),
    ]
