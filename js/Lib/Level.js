class Level {
    constructor(id, thrs, title) {
        this.__id = id;
        this.__thrs = thrs;
        this.__title = title;
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
}