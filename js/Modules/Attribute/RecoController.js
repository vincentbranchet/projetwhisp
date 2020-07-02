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