class RecoController extends AppChild {
    constructor(app) {
        super(app);
    }

    getAvailable() {
        let portfolioAttributes = [];
        let availableRecoId = [];
        let profiles = this.__app.__portfolioController.getProfiles();

        profiles.forEach(profile => {
            portfolioAttributes.push(profile.__attributes);
        });

        console.log(portfolioAttributes);

        this.__app.__recosManager.__recos.forEach(reco => {
        // for each reco
        let requiredAvailable = [];
            for(let i = 0; i < reco.__required.length; i++) {
            // check each required attribute id
                for(let y = 0; y < portfolioAttributes.length; y++) {
                // and see if found in available attribute array                    
                    if(portfolioAttributes[y] == reco.__required[i]) {
                    // if found, push reco id in array
                        requiredAvailable.push(reco.__id);
                    }
                }
            }
        });
    }
}