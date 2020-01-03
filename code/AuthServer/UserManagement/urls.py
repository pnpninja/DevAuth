from django.urls import path
from django.conf.urls import url
from UserManagement import views

urlpatterns = [
    path('register', views.register),
    url(r'(?P<request_id>\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/$', views.index),
    path('success', views.success),
    url(r'login/(?P<request_id>\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)$', views.login)
]