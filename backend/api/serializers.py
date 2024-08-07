from rest_framework import serializers
from .models import User, UserProfile, Tutor, Appointment, EssayAppointment 
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'lvl2complete', 'gradelevel', 'graduationyear', 'bio', 'town',
                  'school', 'nearestuni']

class UserSerializer(serializers.ModelSerializer):
    '''FOR MAIN AUTH USER MODEL'''
    userprofile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'username' ,'email', 'first_name', 'last_name', 'userprofile')
        
        
class CreateUserSerializer(serializers.ModelSerializer):
    '''FOR CREATING NEW USER'''
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'username', 'password')
        extra_kwargs = {
            'password': {'required': True, 'write_only': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},    
        }
        
    #when validating check    
    def validate(self, attrs):
        email = attrs.get('email', '').strip().lower()
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email already exists")
        return attrs
    
    #on creation 
    def create(self, validated_data):
        userInstance = User.objects.create_user(**validated_data)
        return userInstance
    
    #NOT NEEDED: {'write_only': True}
    
    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)
    #     rep.pop('passoword', None)
    #     return rep
    
    
class UpdateUserSerializer(serializers.ModelSerializer):
    '''FOR UPDATING USER INFO'''
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')
        extra_kwargs = {
            'password': {'required': True, 'write_only': True},
        }
        
    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        if password:
            instance.set_password(password)
        instance = super().update(instance, validated_data)
        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'},
                                    trim_whitespace= False)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        user = authenticate(
            reqest=self.context.get('request'),
            username=username,
            password=password
        )
        
        if not user:
            raise serializers.ValidationError("Log in credentials are incorrect")
        
        attrs['user'] = user
        return 
    
class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = '__all__'

    
class ListTutorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    
    class Meta:
        model = Tutor
        fields = ('id', 'first_name', 'last_name', 'subjects', 'bio', 'avatar', 'school' ,'user', 'email')

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        extra_kwargs = {'student': {'required': False}, 'tutor': {'required': False}}
        
class AppointmentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'status', 'post_session_comment']
        
class UpcomingSessionsSerializer(serializers.ModelSerializer):
    tutor_first_name = serializers.CharField(source='tutor.user.first_name')
    tutor_last_name = serializers.CharField(source='tutor.user.last_name')
    tutor_email = serializers.EmailField(source='tutor.user.email')


    class Meta:
        model = Appointment
        fields = ['id', 'student', 'tutor', 'subject', 'date_time', 'duration_minutes',
                  'location', 'physical_location', 'status', 'tutor_first_name', 'tutor_last_name', 'tutor_email']
        

class DashboardSerializer(serializers.Serializer):
    user = UserSerializer()
    tutors = ListTutorSerializer(many=True)
    appointments = UpcomingSessionsSerializer(many=True)
    
class TutorDashboardSerializer(serializers.Serializer):
    tutor = TutorSerializer()
    appointments = UpcomingSessionsSerializer(many=True)

'''
FOR CREATING/UPDATING ESSAY APPOINTMENT
Custom create() and update() is to put in the tutor and user instances
on object creation
'''
class EssayAppointmentSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer()
    student_username = serializers.CharField(max_length=150, write_only=True)
    tutor_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = EssayAppointment
        fields = ['student_work_link', 'student_work_text', 'student_work_file',
                  'student_comments', 'tutor_feedback', 'tutor_contact', 'is_review_finished',
                  'appointment', 'student_username', 'tutor_id']

    def create(self, validated_data):
        try:
            #pull out student_username and put in student user instance
            student_username = validated_data.pop('student_username')
            student_user_instance = User.objects.get(username=student_username)
            student_profile_instance = student_user_instance.userprofile
            #pull out tutor_id and put in tutor user instance         
            tutor_id = validated_data.pop('tutor_id')
            tutor_instance = Tutor.objects.get(pk=tutor_id)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Invalid student username or tutor ID.")
                
        appointment_data = validated_data.pop('appointment')
        appointment_data['student'] = student_profile_instance
        appointment_data['tutor'] = tutor_instance
        
        appointment = Appointment.objects.create(**appointment_data)
        essay_appointment = EssayAppointment.objects.create(appointment=appointment, **validated_data)
        return essay_appointment

    def update(self, instance, validated_data):
        appointment_data = validated_data.pop('appointment', None)
        if appointment_data:
            appointment_serializer = AppointmentSerializer(instance.appointment, data=appointment_data, partial=True)
            if appointment_serializer.is_valid():
                appointment_serializer.save()
        return super().update(instance, validated_data)
    
    


