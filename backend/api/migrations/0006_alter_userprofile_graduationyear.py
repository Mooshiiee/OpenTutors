# Generated by Django 5.0.6 on 2024-06-30 05:43

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_userprofile_gradelevel_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='graduationyear',
            field=models.IntegerField(null=True, validators=[django.core.validators.MaxValueValidator(2040), django.core.validators.MinValueValidator(2020)]),
        ),
    ]
