class Level {
    constructor(id, thrs, title, cash) {
        this.__id = id;
        this.__thrs = thrs;
        this.__title = title;
        this.__cash = cash;
    }

    get id() {
        return this.__id;
    }
    get thrs() {
        return this.__thrs;
    }
    get title() {
        return this.__title;
    }
    get cash() {
        return this.__cash;
    }
}