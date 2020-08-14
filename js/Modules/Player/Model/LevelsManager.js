class LevelsManager {
    constructor() {

        this.__fileName = "levels";
        this.__sheetName = "levels";

        this.__levels = [];
    }

    init() {
    // get from json
        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', levels => {
                console.log(levels);
                levels[this.__sheetName].map(level => this.__levels.push(new Level(level.id, level.title, level.xpCap, level.profiles, level.newSlot, level.printId)));
                console.log(this);
                resolve();
            })

            .fail(() => reject(new Error("getJSON error in LevelsManager : couldn't load " + this.__fileName)));
        }); 
    }

    getTitleOf(lv) {
        for(let i = 0; i < this.__levels.length; i++) {
            if(this.__levels[i].__id == lv) {
                return this.__levels[i].__title; 
            }
        }       
    }

    getFromId(id) {
        let target;
        this.__levels.forEach(lv => {
            if(lv.__id == id) {
                target = lv; 
            }                
        });
        return target;   
    }

    get levels() {
        return this.__levels;
    }
}