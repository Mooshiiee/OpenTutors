from django.urls import path, include
from knox import urls
from api import views
from knox.views import LogoutAllView, LogoutView
# knox url pattern
# /api/auth/login -> LoginView
# /api/auth/logout -> LogoutView
# /api/auth/logoutall -> LogoutAllView

urlpatterns = [
    path(r'auth/login/', views.LoginView.as_view(), name='knox_login'),
    path(r'auth/logout/', LogoutView.as_view(), name='knox_logout'),
    path(r'auth/logout-all/', LogoutAllView.as_view(), name='knox_logoutall'),
    path(r'create-user/', views.CreateUserView.as_view()),
    path(r'update-user/<int:pk>', views.UpdateUserView.as_view()),
    path(r'dashboard/', views.DashboardView.as_view()),
    path(r'level2form/<str:username>', views.LevelTwoFormView.as_view(), name='level2form'),
    path(r'get-tutors/', views.ListTutorsView.as_view(), name='get-tutors'),
    path(r'create-essay-appt/', views.CreateEssayAppointmentView.as_view(), name='create-essay-appt'),
    path(r'update-appointment/<int:pk>/', views.StudentUpdateAppointmentView.as_view(), name='update-appointment'),
    path(r'tutor-dashboard', views.TutorDashboardView.as_view(), name='tutor-dashboard'),
    path(r'tutor-update-appointment/<int:pk>/', views.TutorUpdateAppointmentView.as_view(), name='tutor-update-appointment')
]   