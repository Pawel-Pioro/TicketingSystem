from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path("me/", views.userInfo, name="userInfo"),
    path("tickets/", views.tickets, name="tickets"),
    path("tickets/<int:id>/", views.singleTicket, name="singleTicket"),
    path("sendMessage/", views.sendMessage, name="sendMessage"),
    path("graphs/", views.graphs, name="graphs"),

    # authentication
    path("login/", views.loginView, name="login"),
    path("register/", views.registerView, name="register"),

    # token authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
