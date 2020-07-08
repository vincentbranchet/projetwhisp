class RecoManager {
    constructor() {
        this.__recos = [];
    }

    init() {
        // get from json

        // bad way
        this.create(1, "Promouvoir", "Vous méritez un nouveau poste !", 10);
        this.__recos[0].fillRequired(2, 3);
        this.create(2, "Relooker", "Envie de s'embellir ?", 10, 1);
        this.__recos[1].fillRequired(1);
        this.create(3, "Débaucher", "Vos talents peuvent rapporter gros", 15, 2);
        this.__recos[2].fillRequired(3, 4);
        this.create(4, "Organiser une fête", "Une idée pour cultiver vos relations sociales", 12, 3);
        this.__recos[3].fillRequired(2, 6);
        this.__recos[3].fillForbidden(2);
        this.create(5, "Devenir influenceur", "Montrez votre vie de rêve à tout le monde !", 10, 4);
        this.__recos[4].fillRequired(4, 1);
    }

    create(id, name, desc, cld, evtId) {
        this.__recos.push(new Reco(id, name, desc, cld, evtId));
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