
from django.urls import path
from . views import *


urlpatterns = [
     path('register/',User_register),
 path('login/',User_login),
 path("logout/", logout_view),
 path("appointments/", create_appointment),
 path("my-appointments/", list_appointments),
]