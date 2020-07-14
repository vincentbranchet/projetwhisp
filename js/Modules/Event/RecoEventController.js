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

        this.__controller.__app.__UIController.toPortfolio();
    }
    
    resolve(evtId, profileId) {
        var self = this;
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(evtId);
        let reco = this.__controller.__app.__recoManager.getFromId(event.__reco);
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

        console.log(event);
        // if news must be printed after event, set news controller to print it
        if(event.__newsId != 0) {
            this.__controller.__app.__newsController.print(event.__newsId);
            console.log(this.__controller.__app.__newsManager);
        }

        // mark as resolved, delete from launched and push to resolved
        event.__timer.stop();
        event.__timer.reset();
        event.__wasResolved = 1; 
        let eventIndex = profile.__launchedReco.indexOf(event);
        profile.__launchedReco.splice(eventIndex, 1);
        profile.__recoEvents.push(event);

        this.__controller.__nativeController.scanToLaunch();
        
        if(event.__toSpawn.length == 0 && event.__toDelete.length == 0) {
        // if event has no consequences
            this.__controller.__app.__notificationController.print(profile.__name + " n'a pas tenu compte de la recommandation " + reco.__name);
        }
        else {
        // if event has consequences
            this.__controller.__app.__notificationController.print(profile.__name + " a tenu compte de la recommandation " + reco.__name);
        }
    
        this.__controller.__app.__UIController.__newsUIController.notify();
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }
}