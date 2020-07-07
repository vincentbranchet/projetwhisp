class RecoController extends AppChild {
    constructor(app) {
        super(app);
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
        // for each reco in the game
        
            let totalRequired = reco.__required.length;
            let requiredAvailable = 0;
            
            for(let i = 0; i < reco.__required.length; i++) {
                console.log(reco.__name, reco.__required.length);
            // and each of their required attribute id
                for(let y = 0; y < profileAttId.length; y++) {
                // see if attribute is found in profile attributes array                    
                    if(profileAttId[y] == reco.__required[i]) {
                    // if found, increment number of required att found
                        requiredAvailable++;
                    }
                }
            }

            if(requiredAvailable == totalRequired) {
            // if all required attribute were found
                availableRecoId.push(reco.__id);
            }
        });

        return availableRecoId;
    }
}