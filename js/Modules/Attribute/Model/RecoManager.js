class RecoManager {
    constructor() {
        this.__recos = [];
    }

    init() {
        // get from json

        // bad way

    }

    getFromId(recoId) {
        var targetReco;
        this.__recos.forEach(reco => {
            if(reco.__id == recoId) {
                targetReco = reco; 
            }                
        });
        return targetReco;
    }

    get recos() {
        return this.__recos;
    }
}