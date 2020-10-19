class NotificationController extends AppChild {
    constructor(app) {
        super(app);
    }

    print(content, saveLocation) {
        // get last id from manager and increment to set new id
        const id = this.__app.__notificationManager.printed.length;
        // get computer date
        const date = new Date();
        // ask manager to create news with id, date and content
        const notif = this.__app.__notificationManager.create(id, date, content);
        // save notif in something (event)
        if(saveLocation) {
            saveLocation.resolveDate = notif.date;
        }
        // switch news UI to "something happened" mode
        this.__app.__UIController.__newsUIController.notify();
    }
}