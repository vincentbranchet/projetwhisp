class Notification {
    constructor(id, date, content) {
        this.__id = id;
        this.__date = date;
        this.__content = content;
    }

    set date(newDate) {
        this.__date = newDate;
    }

    get id() {
        return this.__id;
    }
    get date() {
        return this.__date;
    }
    get content() {
        return this.__content;
    }
}