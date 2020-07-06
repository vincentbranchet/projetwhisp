class RecoController extends AppChild {
    constructor(app) {
        super(app);
    }

    scan() {
        var self = this;

        // loop through portfolio profiles
        this.__app.__portfolioManager.__profiles.forEach(profile => {
            if(profile.__launchedEvents.length >= 1) {
            // and through profiles launched events
                for(let event of profile.__launchedEvents) {
                // check if event timer >= delay
                    if(event.__timer.duration >= event.__delay) {
                    // if so, resolve event 
                        self.__app.__eventController.__recoController.resolve(event.__id, profile.__id);
                    }
                }
            }
        });
    }

    getAvailableOf(profile) {
        // returns available recos ids
        let profileAttributes = profile.__attributes;
        let profileAttId = [];
        
        let availableRecoId = [];

        profileAttributes.forEach(att => {
            profileAttId.push(att.__id);
        });

        this.__app.__recoManager.__recos.forEach(reco => {
        // for each reco
        
            let totalRequired = reco.__required.length;
            let requiredAvailable = 0;
            
            for(let i = 0; i < reco.__required.length; i++) {
            // check each required attribute id
                for(let y = 0; y < profileAttId.length; y++) {
                // and see if found in available attribute id array                    
                    if(profileAttId[y] == reco.__required[i]) {
                    // if found, increment number of required att found
                        requiredAvailable++;
                    }
                }
            }

            if(requiredAvailable == totalRequired) {
                availableRecoId.push(reco.__id);
            }
        });

        return availableRecoId;
    }
}