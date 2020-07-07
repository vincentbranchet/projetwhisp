class Player {
    constructor() {
        this.__portfolioValue = 0;
        this.__cashValue = 500;
        this.__level = 1;
        this.__gameTime = new Timer();
    }

    //setters
    set cashValue(newCash) { // round to 2 decimal max
        this.__cashValue = Math.round(newCash * 100) / 100;
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
    get gameTime() {
        return this.__gameTime;
    }
}