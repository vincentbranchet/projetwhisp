class Player {
    constructor() {
        this.__portfolioValue = 0;
        this.__cashValue = 500;
    }

    init() {
        // init from config
    }

    //setters
    set cashValue(newCash) {
        this.__cashValue = newCash;
    }
    set portfolioValue(newPv) {
        this.__portfolioValue = newPv;
    }

    //getters
    get portfolio() {
        return this.__portfolio;
    }
    get portfolioValue() {
        return this.__portfolioValue;
    }
    get cashValue() {
        return this.__cashValue;
    }
}