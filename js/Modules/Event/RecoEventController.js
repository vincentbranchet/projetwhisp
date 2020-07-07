class RecoEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    scan() {
        var self = this;

        // loop through portfolio profiles
        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
            if(profile.__launchedReco.length >= 1) {
            // and through profiles launched reco events
                for(let event of profile.__launchedReco) {
                // check if event timer >= delay
                    if(event.__timer.duration >= event.__delay) {
                    // if so, resolve event 
                        self.__controller.__app.__eventController.__recoController.resolve(event.__id, profile.__id);
                    }
                }
            }
        });
    }

    launch(evtId, profileId) {
        console.log("launch " + evtId + ", " + profileId);
        let reco = this.__controller.__app.__recoManager.getFromId(evtId);
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(reco.__evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        // start timer
        event.__timer.start();

        // mark as launched and push to profile
        event.__hasLaunched = 1;
        profile.__launchedReco.push(event);

        this.__controller.__app.__UIController.update();
    }
    
    resolve(evtId, profileId) {
        var self = this;
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
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
        let eventIndex = profile.__launchedReco.indexOf(event);
        profile.__launchedReco.splice(eventIndex, 1);
        profile.__recoEvents.push(event);

        this.__controller.__nativeController.scanToLaunch();
        
        this.__controller.__app.__UIController.update();

        alert(profile.__name + " a terminé l'événement " + event.__name);
    }
}