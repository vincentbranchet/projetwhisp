class ShopController extends AppChild {
    constructor(app) {
        super(app);

        this.__selectProfile;
    }

    updateProfiles() {
        self = this;
        let level = this.__app.__levelsManager.getFromId(this.__app.__player.level);

        if(level.hasSpawned == 0 && level.profiles && Array.isArray(level.profiles)) {
        // if level spawns multiple profiles
            level.profiles.forEach(id => {
                const profile = self.__app.__shopManager.getFromId(id);
    
                self.add(profile);

                level.hasSpawned == 1;
            });
        }
        else if(level.hasSpawned == 0 && level.profiles) {
        // if level spawns one profile
            const profile = self.__app.__shopManager.getFromId(level.profiles);
    
            self.add(profile);

            level.hasSpawned == 1;
        }
    }

    add(profile) {
        if(profile instanceof Profile)
            this.__app.__shopManager.__inShop.push(profile);
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__shopManager.inShop.forEach(profile => {
                if(profile.id == target.id) {
                    let targetIndex = self.__app.__shopManager.inShop.indexOf(profile);
                    self.__app.__shopManager.__inShop.splice(targetIndex, 1);
                }
            });
        }
    }

    removeAll() {        
        this.__app.__shopManager.inShop = [];
    }

    get selectProfile() {
        return this.__selectProfile;
    }
}