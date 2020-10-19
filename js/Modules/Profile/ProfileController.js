class ProfileController extends AppChild {
    constructor(app) {
        super(app);
    }

    updateShop() {
        let self = this;

        this.__app.__shopManager.inShop.forEach(profile => {
            self.evaluate(profile.id, "shop");
        });
    }

    updatePortfolio() {
        let self = this;

        this.__app.__portfolioManager.profiles.forEach(profile => {
            self.evaluate(profile.id, "portfolio");
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
        profile.attributes.forEach(id => {
            let att = self.__app.__attributeManager.getFromId(id);

            if(att) {
                if(att.isMult == 1) {
                // if att is multiplier
                    multBy = multBy * att.multRate;
                }
                else {
                    profile.value = profile.value + att.value;
                }
            }
        });

        profile.value = profile.value * multBy;

        if(profile.value < 0)
            profile.value = 0;
    }
}