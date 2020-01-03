from __future__ import unicode_literals
from django.db import models
import bcrypt

class UserManager(models.Manager):
    def validator(self, postData):
        errors = {}
        if len(postData['email']) == 0:
            errors['email'] = "You must enter an email"

        if len(postData['password']) < 8:
            errors['password'] = "Password is too short!"
        
        if len(postData['device_id']) == 0:
            errors['device_id'] = "Must submit a Device ID"

        return errors
    
    def register_user(self, user_data):
        user_id = user_data['email']
        if not self.filter(email=user_id).exists():
            hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
            self.create(email=user_id, password=hashed_password.decode('utf-8'), device_id=user_data['device_id'])
            return True
        else:
            return False

class User(models.Model):
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    device_id = models.TextField()
    objects = UserManager()