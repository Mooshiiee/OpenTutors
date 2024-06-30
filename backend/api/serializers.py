from rest_framework import serializers
from .models import User, UserProfile
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    '''FOR MAIN AUTH USER MODEL'''
    lvl2complete = serializers.BooleanField(source='userprofile.lvl2complete')
    class Meta:
        model = User
        fields = ('id', 'username' ,'email', 'first_name', 'last_name', 'lvl2complete')
        
class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = ['id', 'lvl2complete', 'gradelevel', 'graduationyear', 'bio', 'town',
                  'school', 'nearestuni', 'user']
        
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