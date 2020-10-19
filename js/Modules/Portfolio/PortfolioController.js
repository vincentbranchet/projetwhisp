class PortfolioController extends AppChild {
    constructor(app) {
        super(app);
    }

    newSlot() {
        this.__app.__portfolioManager.slots++;
    }

    updateValue() {
        var self = this;
        self.__app.__player.portfolioValue = 0;
        
        this.__app.__portfolioManager.profiles.forEach(profile => {
            self.__app.__player.portfolioValue = self.__app.__player.portfolioValue + profile.value;
        });

        if(self.__app.__player.portfolioValue < 0)
            self.__app.__player.portfolioValue = 0;
    }

    add(profile) {
        if(profile instanceof Profile && this.__app.__portfolioManager.used < this.__app.__portfolioManager.slots) {
            this.__app.__portfolioManager.profiles.push(profile);

            this.__app.__portfolioManager.used++;
        }
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__portfolioManager.profiles.forEach(profile => {
                if(profile.id == target.id) {
                    const targetIndex = self.__app.__portfolioManager.profiles.indexOf(profile);
                    self.__app.__portfolioManager.__profiles.splice(targetIndex, 1);

                    this.__app.__portfolioManager.used--;
                }
            });
        }
    }
}