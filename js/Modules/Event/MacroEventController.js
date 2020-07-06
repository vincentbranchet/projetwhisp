class MacroEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    launch(evtId) {
        // get all portfolio profiles
        // get macroEvent from id
        // apply macroEvent effects to profiles
        // push macroEvent in each profile macroEvent history list

        event.__hasLaunched = 1;
        event.__wasResolved = 1;
    }
}