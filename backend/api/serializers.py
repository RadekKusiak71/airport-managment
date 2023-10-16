from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

    def validate(self, data):
        if data.get('password') != data.get('password2'):
            raise serializers.ValidationError("Passwords don't match")

        email = data.get('email')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("This email is already taken")

        username = data.get('username')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("This username is already taken")

        return data