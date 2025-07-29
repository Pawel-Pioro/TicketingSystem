from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

UserModel = get_user_model()

from .models import Ticket, Message

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, validated_data):
        user = authenticate(username=validated_data['username'], password=validated_data['password'])

        if not user:
            raise serializers.ValidationError("Wrong username or password")
        else:
            return user

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        user.save()
        return user

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'is_staff')        

class MessageSerializer(serializers.ModelSerializer):
    messageAuthor = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

    def get_messageAuthor(self, obj):
        return obj.messageAuthor.username

class TicketSerializer(serializers.ModelSerializer):
    ticketAuthor = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = '__all__'

    def get_ticketAuthor(self, obj):
        return obj.ticketAuthor.username
    
    def get_messages(self, obj):
        messages = obj.message.all()
        serializer = MessageSerializer(messages, many=True)
        return serializer.data
    
class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('title',)

    def create(self, validated_data):
        newTicket = Ticket.objects.create(ticketAuthor = self.context['request'].user, title = validated_data['title'])
        newTicket.save()
        newTicket.title = f"#{newTicket.id} {newTicket.title}"
        newTicket.save()
        return newTicket