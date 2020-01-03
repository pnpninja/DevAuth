from dependency_injector import providers, containers
from django.conf import settings
import onesignal as onesignal_sdk
import UserManagement.Helper.NotificationSender
from UserManagement.Helper.NotificationSender import NotificationSender
    
class NotificationClient(containers.DeclarativeContainer):
    #print("Huhahaha "+settings.ONESIGNAL_REST_API_KEY+" "+ settings.ONESIGNAL_APP_ID)
    notiClient = providers.Singleton(onesignal_sdk.Client, app_auth_key=settings.ONESIGNAL_REST_API_KEY, app_id=settings.ONESIGNAL_APP_ID)

class NotificationFactory(containers.DeclarativeContainer):
    #print(str(NotificationClient.notiClient))
    notiSender = providers.Factory(NotificationSender, onesignalobj = NotificationClient.notiClient, appId = settings.ONESIGNAL_APP_ID)