class NotificationController extends AppChild {
    constructor(app) {
        super(app);
    }

    print(content, saveLocation) {
        // get last id from manager and increment to set new id
        let id = this.__app.__notificationManager.__printed.length;
        // get computer date
        let date = new Date();
        // ask manager to create news with id, date and content
        let notif = this.__app.__notificationManager.create(id, date, content);
        // save notif in something (event)
        if(saveLocation) {
            console.log("saving event");
            saveLocation.__resolveDate = notif.__date;
        }
        // switch news UI to "something happened" mode
        this.__app.__UIController.__newsUIController.notify();
    }
}