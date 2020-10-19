class NotificationManager {
    constructor() {

        this.__printed = [];
    }

    create(id, date, content) {
        const notif = new Notification(id, date, content);

        this.__printed.push(notif);

        return notif; // so it can be stored elsewhere
    }

    getFromId(notifId) {
        let targetNotif;
        this.__printed.forEach(notif => {
            if(notif.id == notifId) {
                targetNotif = notif; 
            }                
        });
        return targetNotif;   
    }

    get printed() {
        return this.__printed;
    }
}