from django.urls import path
from django.conf.urls import url
from ClientApp import views

urlpatterns = [
    path('login', views.login),
    path('', views.index),
    path('home',views.home),
    path('callback',views.callback)
]
