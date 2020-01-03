import json
import bcrypt
import requests
import datetime
from django.conf import settings
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from .models import User
#from dependency_injector import providers, containers
from UserManagement.containers import NotificationClient, NotificationFactory, NotificationSender
from AppManagement.models import LoginRequest, AppSpec

def index(request, request_id=None):
    return render(request, 'register/index.html')

@csrf_exempt
def register(request):
    if request.method == "POST":
        register_data = json.loads(str(request.body, encoding='utf-8'))
        errors = User.objects.validator(register_data)
        if len(errors):
            return JsonResponse(errors, status=400)
        status = User.objects.register_user(register_data)
        return_data = dict()
        if status:
            return_data['success'] = 'User Registered'
            return JsonResponse(return_data, status=200)
        else:
            return_data['error'] = 'User Already Registered'
            return JsonResponse(return_data, status=400)
    else:
        return_data = dict()
        return_data['error'] = 'Must Access Using POST'
        return JsonResponse(return_data, status=403)

def login(request, request_id):
    fail_redirect_url = '/user/' + str(request_id)
    if (User.objects.filter(email=request.POST['login_email']).exists()):
        try:
            user = User.objects.get(email=request.POST['login_email'])
            if (bcrypt.checkpw(request.POST['login_password'].encode('utf-8'), user.password.encode())):
                status = app_request_forward(request_id, user)
                if status:
                    request.session['user_name'] = str(user.email)
                    redirect_url = "http://172.20.10.4:4000/home" + "?request_id=" + str(request_id)
                    return redirect(redirect_url)
                else:
                    redirect(fail_redirect_url)
        except ObjectDoesNotExist:
            return redirect(fail_redirect_url)
    return redirect(fail_redirect_url)

def success(request):
    user = User.objects.get(email=request.session['user_name'])
    context = {
        "user": user
    }
    return render(request, 'register/success.html', context)

def get_app_name(app_token):
    if (AppSpec.objects.filter(app_token=app_token)):
        try:
            app_obj = AppSpec.objects.get(app_token=app_token)
            return str(app_obj.name)
        except ObjectDoesNotExist:
            print("Request Object Not Found")
    return "Generic App"


def app_request_forward(request_id, user):
    status, request_object = get_request_object(request_id)
    if status:
        header = dict()
        header["Authorization"] = settings.ONESIGNAL_AUTH
        header["content_type"] = "application/json"
        payload = dict()
        payload["app_id"] = settings.ONESIGNAL_APP_ID
        payload["include_player_ids"] = list()
        payload["include_player_ids"].append(user.device_id)
        payload["contents"] = dict()
        payload["contents"]["en"] = "Login Request From " + get_app_name(request_object.app_token)
        payload["headings"] = dict()
        payload["headings"]["en"] = "DevAuth"
        payload["data"] = dict()
        payload["data"]["type"] = "login"
        payload["data"]["client_name"] = get_app_name(request_object.app_token)
        payload["data"]["redirect_url"] = request_object.redirect_url
        payload["data"]["scope"] = request_object.scope
        payload["data"]["request_id"] = request_id
        payload["data"]["timestamp"] = datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        print(payload)
        #one_signal_obj = NotificationFactory.notiSender()
        #status_code, jj = one_signal_obj.sendNotification(payload)
        #print(status_code, "   ", jj)
        response = requests.post("https://onesignal.com/api/v1/notifications", json=payload, headers=header)
        print(response.json)
        return True
    else:
        return False

def get_request_object(request_id):
    if (LoginRequest.objects.filter(request_id=request_id)):
        try:
            request_obj = LoginRequest.objects.get(request_id=request_id)
            return True, request_obj
        except ObjectDoesNotExist:
            print("Request Object Not Found")
    return False, None
