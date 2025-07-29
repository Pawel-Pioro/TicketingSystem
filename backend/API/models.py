from django.db import models
from django.contrib.auth import  get_user_model

# Create your models here.

User = get_user_model()


class Ticket(models.Model):
    title = models.CharField(max_length=100)
    ticketAuthor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ticket")
    staffAssigned = models.ManyToManyField(User, blank=True, related_name="ticketsAssigned")
    timeCreated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timeCreated"]

    def __str__(self):
        return self.title


class Message(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name="message")
    timeSent = models.DateTimeField(auto_now_add=True)
    messageAuthor = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=255)

    class Meta:
        ordering = ["-timeSent"]
    
    def __str__(self):
        return f"{self.content[:20]}... by {self.messageAuthor.username}"