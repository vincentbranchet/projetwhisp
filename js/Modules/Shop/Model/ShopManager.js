class ShopManager {
    constructor() {
        this.__profiles = [];
    }

    add(profile) {
        if(profile instanceof Profile)
            this.__profiles.push(profile);
    }

    remove(target) {
        if(target instanceof Profile) {
            this.__profiles.forEach(profile => {
                if(profile.id == target.id) {
                    var targetIndex = this.__profiles.indexOf(profile);
                    this.__profiles.splice(0, targetIndex);
                }
            });
        }
    }

    //setters

    //getters
    get profiles() {
        return this.__profiles;
    }
    
    // get specific profile

}