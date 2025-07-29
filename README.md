# Ticketing System

This project allows a business to setup admin accounts that will recieve issues from registered users through a ticket system.

## Features

### Business side:
* Be presented with a dashboard that displays the number of tickets created each day
* See a table of all open tickets showing a title, the user who created it and the time it was made
* Be able to send messages to the user through the chat
* Manage the ticket by being able to delete it

### User side:
* Have a simple way to submit a question/issue 
* View their open tickets in table format
* Talk with an admin through the chat

## Technical

* This project was made with Django Rest Framework and React.js along with daisyUI and Tailwind CSS for styling
* Users can create an account and log in to it for submitting a ticket
* Users cannot see other users' tickets
* Admins can see all tickets and only they can delete them
* An admin account is created by giving a user account the is_staff flag within the Django Admin interface

