class NotificationManager {
    constructor() {

        this.__notifs = [];
    }

    create(id, date, content) {
        this.__notifs.push(new Notification(id, date, content));
    }

    getFromId(notifId) {
        let targetNotif;
        this.__notifs.forEach(notif => {
            if(notif.__id == notifId) {
                targetNotif = notif; 
            }                
        });
        return targetNotif;   
    }

    get notifs() {
        return this.__notifs;
    }
}