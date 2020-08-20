class NotificationManager {
    constructor() {

        this.__printed = [];
    }

    create(id, date, content) {
        let notif = new Notification(id, date, content);

        this.__printed.push(notif);

        return notif; // so it can be stored elsewhere
    }

    getFromId(notifId) {
        let targetNotif;
        this.__printed.forEach(notif => {
            if(notif.__id == notifId) {
                targetNotif = notif; 
            }                
        });
        return targetNotif;   
    }

    get notifs() {
        return this.__printed;
    }
}