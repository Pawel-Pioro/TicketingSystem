from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .serializers import TicketSerializer, UserInfoSerializer, UserLoginSerializer, UserRegisterSerializer, TicketCreateSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken 
from collections import Counter

from .models import Ticket, Message

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def loginView(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.validate(data)
        tokens = RefreshToken.for_user(user)
        if user:
            return Response({"tokens": {"refresh": str(tokens), "access": str(tokens.access_token)}}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def registerView(request):
    data = request.data
    print(data)
    serializer = UserRegisterSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.create(serializer.validated_data)
        tokens = RefreshToken.for_user(user)
        if user:
            return Response({"tokens": {"refresh": str(tokens), "access": str(tokens.access_token)}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "User Creation Failed"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def tickets(request,):
    user = request.user
    if request.method == "GET":
        if user.is_staff:
            allTickets = Ticket.objects.all()
            allTicketsSerializer = TicketSerializer(allTickets, many=True)
            return Response({"tickets": allTicketsSerializer.data}, status=status.HTTP_200_OK)
        else:
            usersTickets = Ticket.objects.filter(ticketAuthor=user)
            usersTicketsSerializer = TicketSerializer(usersTickets, many=True)
            return Response({"tickets": usersTicketsSerializer.data}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        title = request.POST.get('title')
        serializer = TicketCreateSerializer(data={'title': title}, context={'request': request})
        if serializer.is_valid():
            newTicket = serializer.save()
            newTicketSerializer = TicketSerializer(newTicket)
            return Response({"ticket": newTicketSerializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          

    return Response({"error": "Method Not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def singleTicket(request, id):
    user = request.user
    if request.method == "DELETE":
        ticketObject = Ticket.objects.get(id=id)

        if user.is_staff:
            ticketObject.delete()
            return Response({"message": "Ticket Deleted"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)     

    return Response({"error": "Method Not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def graphs(request):
    user = request.user
    if user.is_staff:
        ticketsTimeList = list(Ticket.objects.all().values_list('timeCreated'))
        dateValues = []
        
        for time in ticketsTimeList:
            dateValues.append(time[0].strftime("%Y-%m-%d"))
        counts = dict(Counter(dateValues))
        dates = list(counts.values())
        counts = list(counts.keys())
        return Response({"dates": dates, "counts": counts}, status=status.HTTP_200_OK)

    else:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    user = request.user
    userSerializer = UserInfoSerializer(user)

    return Response({"user": userSerializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendMessage(request):
    user = request.user
    ticketID = request.POST.get('ticketID')
    message = request.POST.get('content')
    ticket = Ticket.objects.get(id=ticketID)

    if user.is_staff or ticket.ticketAuthor == user:
        newMessage = Message.objects.create(
            ticket = ticket,
            messageAuthor = user,
            content = message
        )

        return Response({"message": newMessage.content}, status=status.HTTP_200_OK)
    
    else:
        return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)