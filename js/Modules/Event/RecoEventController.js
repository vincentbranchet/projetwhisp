class RecoEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    scan() {
        var self = this;

        // loop through portfolio profiles
        this.__controller.__app.__portfolioManager.profiles.forEach(profile => {
            if(profile.launchedReco.length >= 1) {
            // and through profiles' launched reco events
                for(let event of profile.launchedReco) {
                // check if event timer >= delay
                    if(event.timer.duration >= event.delay) {
                    // if so, resolve event, update portfolio and ask for animation
                        self.__controller.__app.__eventController.__recoController.resolve(event.id, profile.id);

                        self.__controller.__app.__UIController.__portfolioUIController.update();

                        self.__controller.__app.__UIController.fadeIn($("#profile_" + profile.id).find(".slotProfileValue"));
                    }
                }
            }
        });
    }

    launch(evtId, profileId) {
        const reco = this.__controller.__app.__recoManager.getFromId(evtId);
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(reco.evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        if(event.hasLaunched == 0) {
            // start timer
            event.timer.start();

            // mark as launched and push to profile
            event.hasLaunched = 1;

            profile.__launchedReco.push(event);

            // update portfolio
            this.__controller.__app.__UIController.__portfolioUIController.update();

            this.__controller.__app.__UIController.toPortfolio();
        }
    }
    
    resolve(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__recoManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        const oldValue = profile.value;

        // apply effects to profile ; add & delete attributes
        event.toDelete.forEach(id => {
            const indexOfAtt = profile.attributes.indexOf(id);

            if(indexOfAtt >= 0) {
            // if target attribute is present in profile 
                profile.__attributes.splice(indexOfAtt, 1);
            }
        });
        event.toSpawn.forEach(id => {
            let alreadyThere = 0;
            for(let attId of profile.attributes) {
                if(attId == id) {
                    alreadyThere = 1;
                }
            }

            if(alreadyThere == 0) {
            // if target attribute is not yet present in profile
                profile.__attributes.push(id);
            }
        });

        // if closure reco, set profile to closed
        if(event.isClosure) {
            profile.isClosed = 1;
            this.__controller.__app.__appController.sellOut();
        }

        this.__controller.__app.__profileController.evaluate(profileId, "portfolio");

        // if news must be printed after event, set news controller to print it
        if(event.newsId && event.newsId != 0) {
            this.__controller.__app.__newsController.print(event.newsId);
        }

        // mark as resolved, delete from launched and push to resolved
        event.timer.stop();
        event.timer.reset();
        event.wasResolved = 1;
        event.hasLaunched = 0; // so it can be sent again
        event.resolveDate = new Date();
        event.result = profile.value - oldValue;

        const indexOfEvent = profile.launchedReco.indexOf(event);
        if(indexOfEvent >= 0) {
            profile.__launchedReco.splice(indexOfEvent, 1);
            profile.__recoEvents.push(event);
        }

        // scan newly changed profile for native events to launch
        this.__controller.__nativeController.scanToLaunch();

        // change profile state
        profile.hasNew = true;
    
        // UI feedback
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }
}