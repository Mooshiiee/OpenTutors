# Generated by Django 5.0.6 on 2024-07-21 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_essayappointment_student_work_file_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='essayappointment',
            name='student_work_file',
            field=models.FileField(blank=True, null=True, upload_to='studentwork'),
        ),
    ]
