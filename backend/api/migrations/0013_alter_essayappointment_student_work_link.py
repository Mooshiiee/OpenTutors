# Generated by Django 5.0.6 on 2024-07-20 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_essayappointment_student_work_link_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='essayappointment',
            name='student_work_link',
            field=models.URLField(blank=True, null=True),
        ),
    ]
