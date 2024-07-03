from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from api.models import UserProfile

from api.serializers import (
    CreateUserSerializer, 
    UpdateUserSerializer, 
    LoginSerializer,
    UserSerializer,
    UserProfileSerializer
)

from knox import views as knoxviews
from knox.auth import TokenAuthentication

from django.contrib.auth import login

# Create your views here.

class CreateUserView(CreateAPIView):
    '''POST : WILL 400 IF BAD REQUEST'''
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)
    


class UpdateUserView(UpdateAPIView):
    '''PATCH'''
    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    #by default with no permissions_classes it will use token auth
    
class LoginView(knoxviews.LoginView):
    '''POST'''
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )
    
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginView, self).post(request, format=None)
    
        #add first_name to response
        response.data.update({
            "first_name": user.first_name,
        })
        return response
    
class DashBoardView(APIView):   
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
     
    def get(self, request, username):
        print('DashBoardView GET is running now')
        try:
            user = User.objects.get(username=username)
            #get the userProf
            userProfile = UserProfile.objects.get(user_id=user.id)
        except User.DoesNotExist:
            print('user not found')
            return Response(status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
class LevelTwoFormView(APIView):
    authentication_classes= [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self, request, username):
        #get the user instance
        user = get_object_or_404(User, username=username)
        #get the userProfile instance
        userProfile = UserProfile.objects.get(user_id=user.id)
        
        print("before serializion ")
        #ModelSerializer will authomatically update the object with new data
        serializer = UserProfileSerializer(userProfile, data=request.data)
        print("after serializion, now checking if valid ")

        if serializer.is_valid():
            print("f serializer.is_valid()")
            serializer.validated_data['lvl2complete'] = True
            print("adding lvl2 = True")
            instance = serializer.save()
            print("serializer.save")
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        


    
    