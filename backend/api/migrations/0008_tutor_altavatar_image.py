# Generated by Django 5.0.6 on 2024-06-30 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_tutor_appointment_tutoravailability'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutor',
            name='altAvatar_image',
            field=models.ImageField(default='', upload_to=''),
        ),
    ]
