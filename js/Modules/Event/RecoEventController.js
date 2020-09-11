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
                    // if so, resolve event & update portfolio
                        self.__controller.__app.__eventController.__recoController.resolve(event.__id, profile.__id);

                        self.__controller.__app.__UIController.__portfolioUIController.update();
                    }
                }
            }
        });
    }

    launch(evtId, profileId) {
        let reco = this.__controller.__app.__recoManager.getFromId(evtId);
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(reco.__evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        if(event.__hasLaunched == 0) {
            // start timer
            event.__timer.start();

            // mark as launched and push to profile
            event.__hasLaunched = 1;

            profile.__launchedReco.push(event);

            // update portfolio
            this.__controller.__app.__UIController.__portfolioUIController.update();

            this.__controller.__app.__UIController.toPortfolio();
        }
    }
    
    resolve(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        // apply effects to profile
        event.__toDelete.forEach(id => {
            let indexOfAtt = profile.__attributes.indexOf(id);

            if(indexOfAtt >= 0) {
            // if target attribute is present in profile 
                profile.__attributes.splice(indexOfAtt, 1);
            }
        });

        event.__toSpawn.forEach(id => {
            let alreadyThere = 0;
            for(let attId of profile.__attributes) {
                if(attId == id) {
                    alreadyThere = 1;
                }
            }

            if(alreadyThere == 0) {
            // if target attribute is not yet present in profile
                profile.__attributes.push(id);
            }
        });

        this.__controller.__app.__profileController.evaluate(profileId, "portfolio");

        // if news must be printed after event, set news controller to print it
        if(event.__newsId && event.__newsId != 0) {
            this.__controller.__app.__newsController.print(event.__newsId);
        }

        // mark as resolved, delete from launched and push to resolved
        event.__timer.stop();
        event.__timer.reset();
        event.__wasResolved = 1;
        event.__hasLaunched = 0; // so it can be sent again
        event.__resolveDate = new Date();

        let indexOfEvent = profile.__launchedReco.indexOf(event);
        if(indexOfEvent >= 0) {
            profile.__launchedReco.splice(indexOfEvent, 1);
            profile.__recoEvents.push(event);
        }

        this.__controller.__nativeController.scanToLaunch();
    
        this.__controller.__app.__UIController.__newsUIController.notify();
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }
}