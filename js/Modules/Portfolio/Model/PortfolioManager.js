class PortfolioManager {
    constructor() {
        this.__profiles = [];
    }

    // get specific profile
    getFromId(profileId) {
        var targetProfile;
        this.__profiles.forEach(profile => {
            console.log(profile, profileId);
            if(profile.__id == profileId) {
                targetProfile = profile; 
            }                
        });
        return targetProfile;
    }

    //setters

    //getters
    get profiles() {
        return this.__profiles;
    }    
}