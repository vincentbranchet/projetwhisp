class AttributeManager {
    constructor() {
        this.__attributes = [];
    }

    init() {
        //ok way from json

        //bad way
        this.create(1, "Cool", 50);
        this.create(2, "Employé", 150, 1);
        this.create(3, "Compétent", 200);
        this.create(4, "Riche", 500);
        this.create(5, "Marié.e", 75);
        this.create(6, "Super Cool", 100, 0, 1, 10);
        this.create(7, "Nouveau Job", 300);
    }

    create(id, name, value, evtId, isMult, multRate) { // if att is multiplier isMult = 1 & multRate != 0
        this.__attributes.push(new Attribute(id, name, value, evtId, isMult, multRate));
    }

    getFromId(attId) {
        let targetAtt;
        this.__attributes.forEach(att => {
            if(att.__id == attId) {
                targetAtt = att; 
            }                
        });
        return targetAtt;   
    }

    get attributes() {
        return this.__attributes;
    }
}