from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from api.models import UserProfile, Tutor, Appointment, EssayAppointment
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone


from api.serializers import (
    CreateUserSerializer, 
    UpdateUserSerializer, 
    LoginSerializer,
    UserSerializer,
    UserProfileSerializer,
    ListTutorSerializer,
    EssayAppointmentSerializer,
    DashboardSerializer,
    AppointmentUpdateSerializer,
    TutorDashboardSerializer,
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
                
        #getting tutor from Tutor model
        try:
            tutor_profile = Tutor.objects.get(user=user)
            response.data.update({
                "is_tutor": True
            })
        except Tutor.DoesNotExist:
            response.data.update({
                "is_tutor": False
            })
            

        #add first_name to response
        response.data.update({
            "first_name": user.first_name,
        })
        return response
    
    
class DashboardView(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    
    def get(self, request):
        try:
            userProfile = UserProfile.objects.get(user=request.user)
            upcomingSessions = Appointment.objects.filter(student=userProfile)
            tutors = Tutor.objects.all()
        
            data = {
                'user': request.user,
                'tutors': tutors,
                'appointments': upcomingSessions
            }

            serializer = DashboardSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
        
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

class ListTutorsView(ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = ListTutorSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    

class CreateEssayAppointmentView(CreateAPIView):
    queryset = EssayAppointment.objects.all()
    serializer_class = EssayAppointmentSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

#ANY USER CAN MANGE ANY OTHER USERS APPOINTMENTS IF THEY ACCESS
#THE API DIRECTLY. USE perform_update() WITH request.user TO FIRST
#AUTHENTICATE Object LEVEL PERMISSION
class UpdateAppointmentView(UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentUpdateSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    
class TutorDashboardView(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            #get the Tutor instance using token
            tutorProfile = Tutor.objects.get(user=request.user)
            #get the sessions with with tutor object
            sessions = Appointment.objects.filter(tutor=tutorProfile)
            
            #serialize
            data = {
                'tutor': tutorProfile,
                'appointments': sessions
            }
            
            serializer = TutorDashboardSerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 