class RecoManager {
    constructor() {
        this.__fileName = "recos";
        this.__sheetName = "recos";

        this.__recos = [];
    }

    init() {
        // get from json
        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', recos => {

                recos[this.__sheetName].map(reco => this.create(reco.id, reco.name, reco.desc, reco.cld, reco.evtId, reco.newsId, reco.required, reco.forbidden, reco.newsForbidden));

                resolve();
            })

            .fail(() => reject(new Error('getJSON error : couldn\'t load : ' + this.__fileName)));
        });
    }

    create(id, name, desc, cld, evtId, newsId, required, forbidden, newsForbidden) {
        let reco = new Reco(id, name, desc, cld, evtId, newsId, newsForbidden);

        if(required) {
            reco.fillRequired(required);
        }

        if(forbidden) {
            reco.fillForbidden(forbidden);
        }
        
        this.__recos.push(reco);
    }

    getFromId(recoId) {
        var targetReco;
        this.__recos.forEach(reco => {
            if(reco.id == recoId) {
                targetReco = reco; 
            }                
        });
        return targetReco;
    }

    get recos() {
        return this.__recos;
    }
}