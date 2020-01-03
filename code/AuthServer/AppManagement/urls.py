from django.urls import path
from AppManagement import views

urlpatterns = [
    path('register', views.register_app),
    path('retrieveToken', views.retrieve_token),
    path('loginRequest', views.request_for_login)
]