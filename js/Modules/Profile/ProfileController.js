class ProfileController extends AppChild {
    constructor(app) {
        super(app);
    }

    updateShop() {
        let self = this;

        this.__app.__shopManager.__inShop.forEach(profile => {
            self.evaluate(profile.__id, "shop");
        });
    }

    updatePortfolio() {
        let self = this;

        this.__app.__portfolioManager.__profiles.forEach(profile => {
            self.evaluate(profile.__id, "portfolio");
        });
    }

    evaluate(profileId, location) {
        let self = this;
        let profile;
        let multBy = 1;
        
        if (location == "shop") 
            profile = this.__app.__shopManager.getFromId(profileId);
        else if (location == "portfolio")
            profile = this.__app.__portfolioManager.getFromId(profileId);

        profile.value = 0;
        profile.__attributes.forEach(id => {
            let att = self.__app.__attributeManager.getFromId(id);

            if(att) {
                if(att.__isMult == 1) {
                // if att is multiplier
                    multBy = multBy * att.__multRate;
                }
                else {
                    profile.value = profile.__value + att.__value;
                }
            }
        });

        profile.value = profile.__value * multBy;
    }
}