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
                
                levels[this.__sheetName].map(level => this.__levels.push(new Level(level.id, level.thrs, level.title, level.cash)));

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

    getNextOf(lv) {
        for(let i = 0; i < this.__levels.length; i++) {
            if(this.__levels[i].__id == lv) {
                return this.__levels[i+1];
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

    create(id, thrs, title, cash) {
        this.__levels.push(new Level(id, thrs, title, cash));
    }

    get levels() {
        return this.__levels;
    }
}