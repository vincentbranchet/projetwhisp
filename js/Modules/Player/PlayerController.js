class PlayerController extends AppChild {
    constructor(app) {
        super(app);
    }

    buy(profileId) {

        let profile = this.__app.__shopManager.getFromId(profileId);

        if(profile instanceof Profile && this.__app.__player.__cashValue >= profile.__value) {

            this.__app.__player.__cashValue = this.__app.__player.__cashValue - profile.__value;

            this.__app.__portfolioController.add(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.remove(profile);

            this.__app.__eventController.__nativeController.scanToLaunch();

            this.__app.__appController.checkIfLvUp();
            this.__app.__portfolioController.updateValue();
            this.__app.__eventController.__recoController.scan();
            this.__app.__UIController.toPortfolio();
        }
    }

    sell(profileId) {
        
        let profile = this.__app.__portfolioManager.getFromId(profileId);

        if(profile instanceof Profile) {

            this.__app.__player.__cashValue = this.__app.__player.__cashValue + profile.__value;

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