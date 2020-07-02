class LevelsManager {
    constructor() {
        this.__levels = [];
    }

    init() {
        // get from json

        // bad way
        this.create(1, 0, "Bronze");
        this.create(2, 100, "Silver");
        this.create(3, 500, "Gold");
        this.create(4, 1000, "Platine");
        this.create(5, 1500, "Diamond");
        this.create(6, 2000, "Master");
        this.create(7, 3000, "Grand Master");
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

    create(id, thrs, title) {
        this.__levels.push(new Level(id, thrs, title));
    }

    get levels() {
        return this.__levels;
    }
}