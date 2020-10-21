class NotificationController extends AppChild {
    constructor(app) {
        super(app);
    }

    print(content, saveLocation) {
        // get last id from manager + 1
        const id = this.__app.__notificationManager.printed.length;

        const date = new Date();

        const notif = this.__app.__notificationManager.create(id, date, content);

        // the event that caused notification printing stores the notification
        if(saveLocation) {
            saveLocation.resolveDate = notif.date;
        }

        // UI feedback
        this.__app.__UIController.__newsUIController.notify();
    }
}