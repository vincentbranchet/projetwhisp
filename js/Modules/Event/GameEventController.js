class GameEventController extends AppChild {
    constructor(app) {
        super(app);
        
        this.__nativeController = new NativeEventController(this);
        this.__recoController = new RecoEventController(this);
    }

    get nativeController() {
        return this.__nativeController;
    }
    get recoController() {
        return this.__recoController;
    }
}