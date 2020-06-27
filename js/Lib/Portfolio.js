class Portfolio {
    constructor() {
        this.__profiles = [];
    }

    init() {

    }

    add(profile) {
        if(profile instanceof Profile)
            this.__profiles.push(profile);
    }

    remove(target) {
        this.__profiles.forEach(profile => {
            if(profile.id == target.id) {
                var targetIndex = this.__profiles.indexOf(profile);
                this.__profiles.splice(0, targetIndex);
            }
        });
    }

    //getters

    //setters
}