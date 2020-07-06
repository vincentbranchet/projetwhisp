class GameEventController extends AppChild {
    constructor(app) {
        super(app);

        this.__macroController = new MacroEventController(this);
        this.__nativeController = new NativeEventController(this);
        this.__recoController = new RecoEventController(this);
    }

    scanToLaunch() {
        // forEach game event
        // check if launchCondition is fulfilled
        // if so, launch event
    }

    scanToResolve() {
        // forEach launched event
        // check if 
    }

    get macroController() {
        return this.__macroController;
    }
    get nativeController() {
        return this.__nativeController;
    }
    get recoController() {
        return this.__recoController;
    }
}