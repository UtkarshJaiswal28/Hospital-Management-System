from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from . models import *
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as django_logout
from rest_framework.permissions import IsAuthenticated


@api_view(["POST"])
def User_register(request):
    data = request.data
    if User.objects.filter(username=data.get("username")).exists():
        return Response({"error": "Username already exists"}, status=400)
    user = User.objects.create_user(
        username=data.get("username"),
        email=data.get("email"),
        password=data.get("password")
    )

    Profile.objects.create(
        user=user,
        phone=data.get("phone"),
        dob=data.get("dob")
    )
    # store phone & dob on a Profile model if you have one
    return Response({"message": "Registration successful"},status=201)


@api_view(["POST"])
def User_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({
            "message": "Login Successful",
            "userId": user.id,
            "username": user.username
        }, status=200)
    else:
        return Response({"message": "Invalid Credentials"}, status=401)
    


@api_view(["POST"])
def logout_view(request):
    django_logout(request)
    return Response({"message": "Logged out successfully"})


@api_view(["POST"])
def create_appointment(request):
    data = request.data
    Appointment.objects.create(
        full_name=data.get("full_name"),
        email=data.get("email"),
        phone=data.get("phone"),
        age=data.get("age"),
        description=data.get("description"),
        appointment_date=data.get("appointment_date"),
        appointment_time=data.get("appointment_time")
    )
    return Response({"message": "Appointment booked successfully"}, status=201)


@api_view(["GET"])
def list_appointments(request):
    appointments = Appointment.objects.all().order_by("-appointment_date")
    data = [
        {
            "id": a.id,
            "full_name": a.full_name,
            "age": str(a.age),
            "appointment_date": a.appointment_date,
            "appointment_time": a.appointment_time,
            "status": a.status,
        }
        for a in appointments
    ]
    return Response(data, status=200)