class PortfolioManager {
    constructor() {
        this.profiles = [];
    }
    
    add(profile) {
        if(profile instanceof Profile)
            this.profiles.push(profile);
    }

    remove(target) {
        if(target instanceof Profile) {
            this.profiles.forEach(profile => {
                if(profile.id == target.id) {
                    var targetIndex = this.profiles.indexOf(profile);
                    this.profiles.splice(0, targetIndex);
                }
            });
        }
    }

    //setters

    //getters
    get profiles() {
        return this.profiles;
    }

    // get specific profile
    
}