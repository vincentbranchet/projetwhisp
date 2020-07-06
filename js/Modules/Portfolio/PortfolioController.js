class PortfolioController extends AppChild {
    constructor(app) {
        super(app);
    }

    updateValue() {
        var self = this;
        self.__app.__player.__portfolioValue = 0;
        
        this.__app.__portfolioManager.__profiles.forEach(profile => {
            self.__app.__player.__portfolioValue = self.__app.__player.__portfolioValue + profile.__value;
        });

        // check if profiles have native events, if so launch them
    }

    getProfiles() {
        return this.__app.__portfolioManager.__profiles;
    }

    add(profile) {
        if(profile instanceof Profile)
            this.__app.__portfolioManager.__profiles.push(profile);
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__portfolioManager.__profiles.forEach(profile => {
                if(profile.__id == target.__id) {
                    let targetIndex = self.__app.__portfolioManager.__profiles.indexOf(profile);
                    self.__app.__portfolioManager.__profiles.splice(targetIndex, 1);
                }
            });
        }
    }
}