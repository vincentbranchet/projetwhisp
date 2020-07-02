class Player {
    constructor() {
        this.__portfolioValue = 0;
        this.__cashValue = 500;
        this.__level = 1;
    }

    //setters
    set cashValue(newCash) {
        this.__cashValue = newCash;
    }
    set portfolioValue(newPv) {
        this.__portfolioValue = newPv;
    }
    set level(newLv) {
        this.__level = newLv;
    }

    //getters
    get portfolioValue() {
        return this.__portfolioValue;
    }
    get cashValue() {
        return this.__cashValue;
    }
    get level() {
        return this.__level;
    }
}