class PortfolioManager {
    constructor() {
        this.__slots = 0;
        this.__used = 0;
        this.__profiles = [];
    }

    init() {
        this.__slots = 1;
    }

    // get specific profile
    getFromId(profileId) {
        let targetProfile;
        this.__profiles.forEach(profile => {
            if(profile.id == profileId) {
                targetProfile = profile; 
            }                
        });
        return targetProfile;
    }

    //setters
    set slots(slots) {
        this.__slots = slots;
    }

    set used(used) {
        this.__used = used;
    }

    //getters
    get profiles() {
        return this.__profiles;
    }   
    
    get slots() {
        return this.__slots;
    }

    get used() {
        return this.__used;
    }
}