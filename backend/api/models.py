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
    short_description = models.TextField()
    date_time = models.DateTimeField()
    duration_minutes = models.SmallIntegerField()
    location = models.CharField(max_length=20, choices=[
        ('IP', 'In-Person'),
        ('VR', 'Virtual'),
        ('MST','Microsoft Teams'),
        ('ZM', 'Zoom'),
        ('DS', 'Discord'),
        ('EIR','Essay In Review')
        
    ])
    status = models.CharField(max_length=20, choices=[
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ])
    
    additional_comments = models.TextField()
    
    