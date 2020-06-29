class ShopController extends AppChild {
    constructor(app) {
        super(app);
    }

    add(profile) {
        if(profile instanceof Profile)
            this.__app.__shopManager.__profiles.push(profile);
    }

    remove(target) {
        var self = this;
        if(target instanceof Profile) {
            this.__app.__shopManager.__profiles.forEach(profile => {
                if(profile.__id == target.__id) {
                    let targetIndex = self.__app.__shopManager.__profiles.indexOf(profile);
                    self.__app.__shopManager.__profiles.splice(targetIndex, 1);
                }
            });
        }
    }
}