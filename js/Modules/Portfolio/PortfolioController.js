class PortfolioController extends AppChild {
    constructor(app) {
        super(app);
    }

    newSlot() {
        this.__app.__portfolioManager.slots++;
    }

    updateValue() {
        var self = this;
        self.__app.__player.__portfolioValue = 0;
        
        this.__app.__portfolioManager.__profiles.forEach(profile => {
            self.__app.__player.__portfolioValue = self.__app.__player.__portfolioValue + profile.__value;
        });

        if(self.__app.__player.__portfolioValue < 0)
            self.__app.__player.__portfolioValue = 0;
    }

    getProfiles() {
        return this.__app.__portfolioManager.__profiles;
    }

    add(profile) {
        if(profile instanceof Profile && this.__app.__portfolioManager.__used < this.__app.__portfolioManager.__slots) {
            this.__app.__portfolioManager.__profiles.push(profile);

            this.__app.__portfolioManager.used++;
        }
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__portfolioManager.__profiles.forEach(profile => {
                if(profile.__id == target.__id) {
                    let targetIndex = self.__app.__portfolioManager.__profiles.indexOf(profile);
                    self.__app.__portfolioManager.__profiles.splice(targetIndex, 1);

                    this.__app.__portfolioManager.used--;
                }
            });
        }
    }
}