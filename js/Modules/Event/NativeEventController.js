class NativeEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    launch(evtId) {
        // get nativeEvent from id
        // start nativeEvent
        event.__hasLaunched = 1;
    }

    resolve(evtId, profileId) {
        // get nativeEvent from id
        // get portfolio profile from id
        // apply nativeEvents effects to portfolio profile
        event.__wasResolved = 1

    }
}