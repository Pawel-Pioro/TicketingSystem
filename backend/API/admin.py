from django.contrib import admin
from .models import Message, Ticket

# Register your models here.

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    readonly_fields = ('timeSent', )

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    readonly_fields = ('timeCreated', )
    