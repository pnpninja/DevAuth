import onesignal as onesignal_sdk
from django.conf  import settings
class NotificationSender(object):
    
    def __init__(self, onesignalobj,appId):
        try:
            self._onesignalobj = onesignalobj
            print(str(self._onesignalobj))
            self._app_id = appId
        except Exception as e:
            raise e

    def sendNotification(self, notificationObject):
        notificationObject["app_id"] = settings.ONESIGNAL_APP_ID
        print("Notif OBJ", notificationObject)
        new_notification = onesignal_sdk.Notification(post_body=notificationObject)
        response = self._onesignalobj.send_notification(new_notification)
        return response.status_code, response.json()
            
    