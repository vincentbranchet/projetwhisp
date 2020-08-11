class Level {
    constructor(id, title, xpCap, profiles) {
        this.__id = id;
        this.__title = title;
        this.__xpCap = xpCap;
        this.__profiles = profiles; // profile ids to spawn in shop at lv up
        this.__hasSpawned = 0;
    }

    get id() {
        return this.__id;
    }
    get title() {
        return this.__title;
    }
    get xpCap() {
        return this.__xpCap;
    }
    get profiles() {
        return this.__profiles;
    }
    get hasSpawn() {
        return this.__hasSpawned;
    }
}