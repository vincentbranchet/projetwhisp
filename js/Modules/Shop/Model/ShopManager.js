class ShopManager {
    constructor() {
        this.__fileName = "profiles";
        this.__sheetName = "profiles";

        this.__profiles = [];
        this.__inShop = [];
    }

    init() {

        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', profiles => {

                profiles[this.__sheetName].map(profile => this.create(profile.id, profile.name, profile.attributes));

                resolve();
            })

            .fail(() => reject(new Error()));
        });
    }

    create(id, name, ...attIds) {
        let profile = new Profile(id, name);

        profile.init(...attIds);

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
    set inShop(profiles) {
        this.__inShop = profiles;
    }

    //getters
    get profiles() {
        return this.__profiles;
    }

    get inShop() {
        return this.__inShop;
    }
}