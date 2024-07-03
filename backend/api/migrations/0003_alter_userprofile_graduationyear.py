# Generated by Django 5.0.6 on 2024-06-30 04:31

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_userprofile_graduationyear'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='graduationyear',
            field=models.SmallIntegerField(null=True, validators=[django.core.validators.MaxLengthValidator(2020), django.core.validators.MinLengthValidator(2040)]),
        ),
    ]
