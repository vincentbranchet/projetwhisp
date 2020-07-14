class LevelsManager {
    constructor() {
        this.__levels = [];
    }

    init() {
        // get from json

        // bad way
        this.create(1, 0, "Bronze", 10);
        this.create(2, 100, "Silver", 100);
        this.create(3, 500, "Gold", 1000);
        this.create(4, 1000, "Platine", 10000);
        this.create(5, 1500, "Diamond", 100000);
        this.create(6, 2000, "Master", 1000000);
        this.create(7, 3000, "Grand Master", 2000000);
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