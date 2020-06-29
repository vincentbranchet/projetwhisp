class PlayerController extends AppChild {
    constructor(app) {
        super(app);
    }

    buy(profileId) {
        console.log("buy");
        let profile = this.__app.__shopManager.getFromId(profileId);

        if(profile instanceof Profile && this.__app.__player.__cashValue >= profile.__value) {

            this.__app.__player.__cashValue = this.__app.__player.__cashValue - profile.__value;

            this.__app.__portfolioController.add(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.remove(profile);

            this.__app.__UIController.update();
        }
        else
            alert("Pas assez de cash");
    }

    sell(profileId) {
        console.log("sell");
        let profile = this.__app.__portfolioManager.getFromId(profileId);

        if(profile instanceof Profile) {

            this.__app.__player.__cashValue = this.__app.__player.__cashValue + profile.__value;

            this.__app.__portfolioController.remove(profile);
            this.__app.__portfolioController.updateValue();
            this.__app.__shopController.add(profile);

            this.__app.__UIController.update();
        }
        else
            alert("Pas assez de cash");
    }

    reco() {
        // player sends reco
    }

    reset() {
        // new game
    }

}