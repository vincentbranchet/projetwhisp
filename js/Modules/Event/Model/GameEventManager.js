class GameEventManager {
    constructor() {
        this.__recoManager = new RecoEventManager(this);
        this.__nativeManager = new NativeEventManager(this);
    }

    init() {
        this.__recoManager.init();
        this.__nativeManager.init();
    }

    get events() {
        return this.__events;
    }
    get recoManager() {
        return this.__recoManager;
    }
    get nativeManager() {
        return this.__nativeManager;
    }
}