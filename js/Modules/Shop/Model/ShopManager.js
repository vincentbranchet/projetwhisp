class ShopManager {
    constructor() {
        this.__profiles = [];
    }

    
    init() {

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
    
    // get specific profile
    getFromId(profileId) {
        var targetProfile;
        this.__profiles.forEach(profile => {
            if(profile.__id == profileId) {
                targetProfile = profile; 
            }                
        });
        return targetProfile;
    }

    //setters
    set profiles(profiles) {
        this.__profiles = profiles;
    }
    //getters
    get profiles() {
        return this.__profiles;
    }

}