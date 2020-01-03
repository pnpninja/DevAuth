from django.db import models

class UserDataManager(models.Manager):
    def save_data(self, user_data):
        request_id = user_data['request_id']
        if not self.filter(request_id=request_id).exists():
            self.create(request_id=request_id, email=user_data['email'], dob = user_data['dob'], name = user_data['name'], consent=[True if user_data['consent'] == "true" else False])
            return True
        else:
            return False
    
    def get_data_by_request_id(self,request_id):
        if not self.filter(request_id=request_id):
            return None
        else:
            return self.get(request_id=request_id)

class UserData(models.Model):
    request_id = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    dob = models.CharField(max_length=255)
    name = models.TextField()
    consent = models.BooleanField(default=False)
    objects = UserDataManager()


