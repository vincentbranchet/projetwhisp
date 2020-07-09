class NotificationManager {
    constructor() {

        this.__printed = [];
    }

    create(id, date, content) {
        this.__printed.push(new Notification(id, date, content));
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