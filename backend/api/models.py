from django.db import models
from django.core.validators import MaxLengthValidator, MinLengthValidator

from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    lvl2complete = models.BooleanField(default=False)
    gradelevel = models.SmallIntegerField(null=True, validators=[
        MaxLengthValidator(12),
        MinLengthValidator(1)
    ])
    graduationyear = models.DateField(null=True)
    bio = models.TextField(null=True)
    town = models.CharField(max_length=120, null=True)
    school = models.CharField(max_length=120, null=True)
    nearestuni = models.CharField(max_length=120, null=True)
    
    


    
    