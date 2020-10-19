class Level {
    constructor(id, title, xpCap, profiles, newSlot, printId) {
        this.__id = id;
        this.__title = title;
        this.__xpCap = xpCap;
        this.__profiles = profiles; // profile ids to spawn in shop at lv up
        this.__newSlot = newSlot; // 0 : slot created at completion | 1 : no slot created at completion
        this.__printId = printId; // news id to be printed at lv up
        this.__hasSpawned = 0;
    }

    set hasSpawned(bool) {
        this.__hasSpawned = bool;
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
    get newSlot() {
        return this.__newSlot;
    }
    get printId() {
        return this.__printId;
    }
    get hasSpawned() {
        return this.__hasSpawned;
    }
}