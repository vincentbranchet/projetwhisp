class Level {
    constructor(id, title, xpCap, profiles, newSlot) {
        this.__id = id;
        this.__title = title;
        this.__xpCap = xpCap;
        this.__profiles = profiles; // profile ids to spawn in shop at lv up
        this.__newSlot = newSlot; // 0 : slot created at completion | 1 : no slot created at completion
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
    get newSlot() {
        return this.__newSlot;
    }
    get hasSpawn() {
        return this.__hasSpawned;
    }
}