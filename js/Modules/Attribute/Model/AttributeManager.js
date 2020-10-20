class AttributeManager {
    constructor() {
        this.__fileName = "attributes";
        this.__sheetName = "attributes";

        this.__attributes = [];
    }

    init() {
    //get from json
        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', atts => {

                atts[this.__sheetName].map(level => this.create(level.id, level.name, level.value, level.events, level.isMult, level.multRate));

                resolve();
            })

            .fail(() => reject(new Error('getJson error in AttributeManager : couldn\'t load ' + this.__fileName)));
        });
    }

    create(id, name, value, events, isMult, multRate) { // if att is multiplier isMult = 1 & multRate != 0
        let att = new Attribute(id, name, value, isMult, multRate);

        if(events) {
            att.fillEvents(events);
        }

        this.__attributes.push(att);
    }

    getFromId(attId) {
        let targetAtt;
        this.__attributes.forEach(att => {
            if(att.id == attId) {
                targetAtt = att; 
            }                
        });
        return targetAtt;   
    }

    get attributes() {
        return this.__attributes;
    }
}