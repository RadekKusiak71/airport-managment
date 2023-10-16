from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from .serializers import UserRegisterSerializer


class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email']
            )
            user.set_password(serializer.validated_data['password'])
            user.save()
            response_data = {
                "success": True,
                "data": {
                    "username": user.username,
                    "email": user.email
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        response_data = {
            "success": False,
            "errors": serializer.errors
        }
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
