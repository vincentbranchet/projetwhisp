class News {
    constructor(id, title, content, img, delay, lv = 0, launchId = 0, comesFromId = 0) {
        this.__id = id;
        this.__title = title;
        this.__content = content;
        this.__img = img;
        this.__delay = delay;
        this.__lv = lv; // player lv condition
        this.__launchId = launchId; // id of macro event to launch with this news
        this.__comesFromId = comesFromId; // id of event which launched this news
        this.__wasPrinted = 0;
        this.__date = 0;
    }

    set date(newDate) {
        this.__date = newDate;
    }
    set wasPrinted(bool) {
        this.__wasPrinted = bool;
    }

    get id() {
        return this.__id;
    }
    get title() {
        return this.__title;
    }
    get content() {
        return this.__content;
    }
    get img() {
        return this.__img;
    }
    get delay() {
        return this.__delay;
    }
    get lv() {
        return this.__lv;
    }
    get launchId() {
        return this.__launchId;
    }
    get comesFromId() {
        return this.__comesFromId;
    }
    get wasPrinted() {
        return this.__wasPrinted;
    }
    get date() {
        return this.__date;
    }
}