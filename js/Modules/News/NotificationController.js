class NotificationController extends AppChild {
    constructor(app) {
        super(app);
    }

    print(content) {
        // get last id from manager and increment to set new id
        let id = this.__app.__notificationManager.__printed.length;
        // get computer date
        let date = new Date();
        // ask manager to create news with id, date and content
        this.__app.__notificationManager.create(id, date, content);
        // switch news UI to "something happened" mode
        this.__app.__UIController.__newsUIController.notify();
        this.__app.__UIController.update();
    }
}