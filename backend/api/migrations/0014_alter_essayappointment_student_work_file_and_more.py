# Generated by Django 5.0.6 on 2024-07-20 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_essayappointment_student_work_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='essayappointment',
            name='student_work_file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='essayappointment',
            name='student_work_text',
            field=models.TextField(blank=True, null=True),
        ),
    ]