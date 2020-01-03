from django.db import models
from django.core.exceptions import ObjectDoesNotExist
import uuid

class AppSpecManager(models.Manager):
    def register_app(self, registration_data):
        app_name = registration_data['name']
        if not self.filter(name=app_name).exists():
            app_token = uuid.uuid4()
            self.create(name=app_name, scope=registration_data['scope'], app_token=app_token)
            # self.save()
            return True, app_token
        else:
            return False, None

    def get_token(self, app_info):
        app_name = app_info['name']
        try:
            record = AppSpec.objects.get(name=app_name)
            return True, record.app_token
        except ObjectDoesNotExist:
            return False, None

    def app_token_valid(self, app_token):
        try:
            record = AppSpec.objects.get(app_token=app_token)
            return True
        except ObjectDoesNotExist:
            return False


class AppSpec(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    scope = models.CharField(max_length=100)
    app_token = models.TextField()
    objects = AppSpecManager()

class LoginRequestManager(models.Manager):
    def lodge_request(self, login_request):
        app_token = login_request["app_token"]
        if AppSpec.objects.app_token_valid(app_token):
            self.create(request_id=login_request['request_id'], app_token=app_token, redirect_url=login_request['redirect_url'], scope=login_request['scope'])
            #self.save()
            return True
        else:
            return False


class LoginRequest(models.Model):
    request_id = models.CharField(max_length=200)
    app_token = models.CharField(max_length=200)
    redirect_url = models.CharField(max_length=200)
    scope = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now=True)
    objects = LoginRequestManager()
