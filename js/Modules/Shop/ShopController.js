class ShopController extends AppChild {
    constructor(app) {
        super(app);

        this.__selectProfile;
    }

    updateProfiles() {
        self = this;
        let level = this.__app.__levelsManager.getFromId(this.__app.__player.__level);

        if(level.__hasSpawned == 0 && level.__profiles && Array.isArray(level.__profiles)) {
        // if level spawns multiple profiles
            level.__profiles.forEach(id => {
                let profile = self.__app.__shopManager.getFromId(id);
    
                self.add(profile);

                level.__hasSpawned == 1;
            });
        }
        else if(level.__hasSpawned == 0 && level.__profiles) {
        // if level spawns one profile
            let profile = self.__app.__shopManager.getFromId(level.__profiles);
    
            self.add(profile);

            level.__hasSpawned == 1;
        }
    }

    add(profile) {
        if(profile instanceof Profile)
            this.__app.__shopManager.__inShop.push(profile);
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__shopManager.__inShop.forEach(profile => {
                if(profile.__id == target.__id) {
                    let targetIndex = self.__app.__shopManager.__inShop.indexOf(profile);
                    self.__app.__shopManager.__inShop.splice(targetIndex, 1);
                }
            });
        }
    }

    get selectProfile() {
        return this.__selectProfile;
    }
}