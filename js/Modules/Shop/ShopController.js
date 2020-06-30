class ShopController extends AppChild {
    constructor(app) {
        super(app);

        this.__selectProfile;
    }

    fill() {
        //get from json (ok way)

        //bad hack way
        this.createProfile(1, "Thomas");
        this.attributeToSelected(1, 2);
        this.add(this.__selectProfile);
        this.createProfile(2, "Virginie");
        this.attributeToSelected();
        this.add(this.__selectProfile);
        this.createProfile(3, "Zafar");
        this.attributeToSelected(3, 4, 5);
        this.add(this.__selectProfile);
    }

    createProfile(id, name) {
        let profile = new Profile(id, name);
        
        this.__selectProfile = profile;
    }

    attributeToSelected(...attributesId) {
        var self = this;
        let attributes = [];

        for(let att of attributesId) {
            attributes.push(self.__app.__attributeManager.getFromId(att));
        }
        
        this.__selectProfile.init(...attributes);
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

    get selectProfile() {
        return this.__selectProfile;
    }
}