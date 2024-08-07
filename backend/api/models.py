from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    lvl2complete = models.BooleanField(default=False)
    gradelevel = models.IntegerField(null=True, validators=[
        MaxValueValidator(12),
        MinValueValidator(1)
    ])
    graduationyear = models.IntegerField(null=True , validators=[
        MaxValueValidator(2040),
        MinValueValidator(2020)
    ])
    bio = models.TextField(null=True)
    town = models.CharField(max_length=120, null=True)
    school = models.CharField(max_length=120, null=True)
    nearestuni = models.CharField(max_length=120, null=True)
    is_tutor = models.BooleanField(default=False)
    
class Tutor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutor')
    bio = models.TextField()
    subjects = models.TextField()
    avatar = models.TextField()
    altAvatar_image = models.ImageField(default='')
    school = models.TextField()
    
class TutorAvailability(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE, related_name='availability')
    
    DAYS_OF_WEEK = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]

    day = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ['tutor', 'day', 'start_time', 'end_time']


class Appointment(models.Model):
    student = models.ForeignKey(UserProfile, on_delete=models.CASCADE,
                                related_name="student_appointments")
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE,
                                related_name="tutor_appointments")
    subject = models.CharField(max_length=100)
    date_time = models.DateTimeField()
    duration_minutes = models.SmallIntegerField()
    location = models.CharField(max_length=20, null=True, choices=[
        ('IP', 'In-Person'),
        ('VR', 'Virtual'),
        ('MST','Microsoft Teams'),
        ('ZM', 'Zoom'),
        ('DS', 'Discord'),
        ('EIR','Essay In Review')
    ])
    student_meeting_preference = models.CharField(max_length=20, default=1, choices=[
        (1, 'In-Person'),
        (2, 'Virtual'),
    ])
    physical_location = models.CharField(null=True, max_length=255)
    phycical_location_map_link = models.CharField(null=True, max_length=255),
    status = models.CharField(max_length=20, default='scheduled', choices=[
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no-show', 'No-Show')
    ])
    
    virtual_link = models.URLField(null=True)
    additional_comments = models.TextField(null=True)
    post_session_comment = models.TextField(null=True)
    
class EssayAppointment(models.Model):
    appointment = models.OneToOneField(Appointment, 
                                       on_delete=models.CASCADE)
    student_work_link = models.URLField(null=True, blank=True)
    student_work_text = models.TextField(null=True, blank=True)
    student_work_file = models.FileField(null=True, blank=True, upload_to='studentwork/')
    student_comments = models.TextField(null=True)
    tutor_feedback = models.TextField(null=True)
    tutor_contact = models.TextField(default='will be updated shortly')
    is_review_finished = models.BooleanField(default=False)
    
class SessionAppointment(models.Model):
    appointment = models.OneToOneField(Appointment, 
                                       on_delete=models.CASCADE)
    student_work = models.TextField()
    student_work_file = models.FileField()
    student_work_link = models.URLField()
    tutor_feedback = models.TextField


    