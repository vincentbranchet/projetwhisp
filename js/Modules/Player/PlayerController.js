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
            this.__app.__UIController.toPortfolio();
        }
        else {
            this.__app.__notificationController.print("Votre portfolio manque de place. Sortez un profil ou gagnez un niveau.");
        }
    }

    sell(profileId) {
        
        let profile = this.__app.__portfolioManager.getFromId(profileId);

        if(profile instanceof Profile) {

            this.__app.__portfolioController.remove(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.add(profile);

            this.__app.__appController.checkIfLvUp();
            this.__app.__portfolioController.updateValue();
            this.__app.__eventController.__recoController.scan();
            this.__app.__UIController.toPortfolio();
        }
    }

    reco() {
        // player sends reco
    }

    reset() {
        // new game
    }

}