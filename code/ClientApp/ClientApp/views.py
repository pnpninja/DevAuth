from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json
import bcrypt
import uuid
import urllib.parse as urlparse
from urllib.parse import urlencode
import requests
import time
from .models import UserData

def index(request):
    return render(request, 'register/index.html')

@csrf_exempt
def login(request):
    unique_id = str(uuid.uuid4())
    
    params = dict()
    params['request_id'] = unique_id
    params['app_token'] = '235ec951-4cc7-4af1-ae88-47b888549652'
    params['scope'] = ','.join(['email', 'location'])
    params['redirect_url'] = "http://172.20.10.4:4000/callback"
    
    #Send POST
    headers = {'content-type': 'application/json'}
    post_url = request.META.get('HTTP_REFERER')[:-6]+ ':8000/apps/loginRequest'
    response = requests.post(post_url, data=json.dumps(params), headers=headers, verify = False)
    print (response.raw)
    url = request.META.get('HTTP_REFERER')[:-6]+":8000/user/login/" + unique_id   + '/'
    return redirect(url)

@csrf_exempt
def home(request):
    req_id = request.GET.get('request_id')
    time.sleep(5)
    data = UserData.objects.get_data_by_request_id(req_id)
    if(data == None):
        return render(request,'register/timeout.html')
    else:
        if data.consent:
            context = {
                "userdata": data
            }
            return render(request,'register/success.html',context)
        else:
            return render(request,'register/failure.html')

@csrf_exempt
def callback(request):
    if request.method == "POST":
        data = json.loads(str(request.body, encoding='utf-8'))
        status = UserData.objects.save_data(data)
        status_code = 0
        if status:
            status_code = 200
        else:
            status_code = 404
        return JsonResponse(data={} ,status=status_code)
    else:
        return JsonResponse(data={}, status=403)




    

