class RecoManager {
    constructor() {
        this.__recos = [];
    }

    init() {
        // get from json

        // bad way
        this.create(1, "Promouvoir", 10);
        this.__recos[0].fillRequired(2, 3);
        this.create(2, "Relooker", 10, 1);
        this.__recos[1].fillRequired(1);
        this.create(3, "Débaucher", 15, 2);
        this.__recos[2].fillRequired(3, 4);
        this.create(4, "Organiser une fête", 12, 3);
        this.__recos[3].fillRequired(2, 6);
    }

    create(id, name, cld, evtId) {
        this.__recos.push(new Reco(id, name, cld, evtId));
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