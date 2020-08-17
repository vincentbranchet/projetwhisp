class RecoController extends AppChild {
    constructor(app) {
        super(app);
    }

    getAvailableOf(profile) {
        // returns available recos ids
        let profileAttId = profile.__attributes;
        
        let availableRecoId = [];

        this.__app.__recoManager.__recos.forEach(reco => {
        // for each reco in the game
            let totalRequired = reco.__required.length;
            let requiredAvailable = 0; // required attributes present in profile
            let hasForbidden = 0; // forbidden attributes present in profile
            let newsControl = 0; // required published news bool control
            
            for(let z = 0; z < reco.__forbidden.length; z++) {
            // and each of their forbidden attributes
                for(let x = 0; x < profileAttId.length; x++) {
                // see if attribute is found in profile attributes array
                    if(profileAttId[x] == reco.__forbidden[z]) {
                    // if found, increment number of forbidden attributes found
                        hasForbidden++;
                    }
                }
            }
            if(hasForbidden == 0) {
            // if no forbidden attributes were found
                for(let i = 0; i < reco.__required.length; i++) {
                // loop through required attribute ids for reco
                    for(let y = 0; y < profileAttId.length; y++) {
                    // see if attribute is found in profile attributes array                    
                        if(profileAttId[y] == reco.__required[i]) {
                        // if found, increment number of required att found
                            requiredAvailable++;
                        }
                    }
                }
            }

            if(reco.__newsId != "" && reco.__newsId != null && reco.__newsId != undefined) {
            // if news is required to print reco
                let news = this.__app.__newsManager.getNewsFromId(reco.__newsId);

                if(news && news.__wasPrinted == 1) {
                // if required news exists in the game & was printed, pass news control
                    newsControl = 1;
                }
                else {
                // if required news doesn't exist or wasn't printed yet, don't pass news control
                    newsControl = 0;
                }
            }
            else if(reco.__newsId == "" || reco.__newsId == null || reco.__newsId == undefined) {
            // if no news is required to print reco, pass news control
                newsControl = 1;
            }

            if(reco.__newsForbidden != "" && reco.__newsForbidden != null && reco.__newsForbidden != undefined) {
            // if news is required NOT to have been published
                let news = this.__app.__newsManager.getPrintedFromId(reco.__newsForbidden);

                if(news && news.__wasPrinted == 1) {
                // if said news was published, cancel news control
                    newsControl = 0;
                }
            }

            if(requiredAvailable == totalRequired && newsControl == 1) {
            // if correct number of required attribute were found (& no forbidden attributes were found)
                availableRecoId.push(reco.__id);
            }
        });

        return availableRecoId;
    }
}