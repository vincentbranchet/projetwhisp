class PlayerController extends AppChild {
    constructor(app) {
        super(app);
    }

    buy(profileId) {

        let profile = this.__app.__shopManager.getFromId(profileId);

        if(profile instanceof Profile && this.__app.__portfolioManager.__used < this.__app.__portfolioManager.__slots) {

            this.__app.__portfolioController.add(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.remove(profile);

            this.__app.__eventController.__nativeController.scanToLaunch();

            this.__app.__appController.checkIfLvUp();
            this.__app.__portfolioController.updateValue();
            this.__app.__eventController.__recoController.scan();

            this.__app.__UIController.__shopUIController.update();
            this.__app.__UIController.__portfolioUIController.update();

            this.__app.__UIController.toPortfolio();
        }
        else {
            this.__app.__notificationController.print("Votre portfolio manque de place. Sortez un profil ou gagnez un niveau.");
        }
    }

    sell(profileId) {
        
        let profile = this.__app.__portfolioManager.getFromId(profileId);

        if(profile instanceof Profile) {
            if(profile.__launchedNative.length > 0) {
            // if profile has running native events
                for(let evt of profile.__launchedNative) {

                    if(evt) {
                    // reset native event in Mananger & delete copy from profile
                        let trueEvent = this.__app.__eventManager.__nativeManager.getFromId(evt.__id);
                        trueEvent.__hasLaunched = 0;
                        trueEvent.__timer.stop();
                        trueEvent.__timer.reset();

                        let indexOfEvent = profile.__launchedNative.indexOf(evt);
                        if(indexOfEvent >= 0) {
                            profile.__launchedNative.splice(indexOfEvent, 1);
                        }
                    }
                }
            }

            this.__app.__portfolioController.remove(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.add(profile);

            this.__app.__appController.checkIfLvUp();
            this.__app.__portfolioController.updateValue();
            this.__app.__eventController.__recoController.scan();
            
            this.__app.__UIController.__shopUIController.update();
            this.__app.__UIController.__portfolioUIController.update();

            this.__app.__UIController.toPortfolio();
        }
    }

    reset() {
        // new game
    }
}