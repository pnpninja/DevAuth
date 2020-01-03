from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from AppManagement.models import AppSpec
from AppManagement.models import LoginRequest
import json

@csrf_exempt
def register_app(request):
    if request.method == "POST":
        register_object = json.loads(str(request.body, encoding='utf-8'))
        status, token = AppSpec.objects.register_app(register_object)
        if status:
            return_json = dict()
            return_json['app_token'] = token
            status_val = 200
        else:
            return_json = dict()
            return_json['error'] = 'App Already registered'
            status_val = 400
        return JsonResponse(return_json,status=status_val)
    else:
        return_json = dict()
        return_json['error'] = 'Request must be a POST'
        return JsonResponse(return_json,status=403)

@csrf_exempt
def retrieve_token(request):
    if request.method == "POST":
        app_info = json.loads(str(request.body, encoding='utf-8'))
        status, token = AppSpec.objects.get_token(app_info)
        if status:
            return_json = dict()
            return_json['app_token'] = token
            status_val = 200
        else:
            return_json = dict()
            return_json['error'] = 'App not Registered'
            status_val = 404
        return JsonResponse(return_json,status=status_val)
    else:
        return_json = dict()
        return_json['error'] = 'Request must be a POST'
        return JsonResponse(return_json,status=403)

@csrf_exempt
def request_for_login(request):
    if request.method == "POST":
        login_request = json.loads(str(request.body, encoding='utf-8'))
        status = LoginRequest.objects.lodge_request(login_request)
        return_json = dict()
        if status:
            return_json['success'] = True
            status_val = 200
        else:
            return_json['success'] = False
            return_json['error'] = 'App not Registered'
            status_val = 403
        return JsonResponse(return_json, status=status_val)
    else:
        return_json = dict()
        return_json['error'] = 'Request must be a POST'
        return JsonResponse(return_json,status=403)