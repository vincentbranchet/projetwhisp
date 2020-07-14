class NativeEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    launch(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        if(event.__hasLaunched == 0) {
            // start nativeEvent
            event.__timer.start();

            event.__hasLaunched = 1;
            // push native event to profile
            profile.__launchedNative.push(event);
        }
    }

    resolve(evtId, profileId) {
        let self = this;
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let att = this.__controller.__app.__attributeManager.getFromId(event.__nativeAttribute);

        // apply nativeEvents effects to portfolio profile
        let attToDelete = [];
        let attToSpawn = [];

        // get attributes to delete from their id in event
        event.__toDelete.forEach(deleteId => {
            for(let att of profile.__attributes) {
                if(att.__id == deleteId) {
                    attToDelete.push(att);
                }
            }
        });

        // get attributes to spawn from their id in event
        event.__toSpawn.forEach(spawnId => {
            for(let att of self.__controller.__app.__attributeManager.__attributes) {
                if(att.__id == spawnId) {
                    attToSpawn.push(att);
                }
            }
        });

        // apply effects to profile
        attToDelete.forEach(att => {
            let indexOfAtt = profile.__attributes.indexOf(att);
            profile.__attributes.splice(indexOfAtt, 1);
        });

        attToSpawn.forEach(att => {
            profile.__attributes.push(att);
        });

        profile.refresh();

        // mark as resolved, delete from launched and push to resolved
        event.__timer.stop();
        event.__timer.reset();

        event.__wasResolved = 1;

        let eventIndex = profile.__launchedNative.indexOf(event);
        profile.__launchedReco.splice(eventIndex, 1);
        profile.__nativeEvents.push(event);
        
        this.__controller.__app.__notificationController.print("L'attribut " + att.__name + " de " + profile.__name + " a donné lieu à des changements");
        this.__controller.__app.__UIController.__newsUIController.notify();
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }

    scanToLaunch() {
        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
            //check if profile has native events
            for(let att of profile.__attributes) {
                if(att.__eventId > 0) {
                //if profile attribute has native event, launch it
                    this.__controller.__app.__eventController.__nativeController.launch(att.__eventId, profile.__id);
                }
            }
        });
    }

    scanToResolve() {
        var self = this;

        // loop through portfolio profiles
        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
            if(profile.__launchedNative.length >= 1) {
            // and through profiles launched native events
                for(let event of profile.__launchedNative) {
                    console.log(profile.__name, event.__timer.__duration);
                // check if event timer >= delay
                    if(event.__timer.__duration >= event.__delay) {
                    // if so, resolve event 
                        self.__controller.__app.__eventController.__nativeController.resolve(event.__id, profile.__id);
                    }
                }
            }
        });
    }
}