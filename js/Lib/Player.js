class Player {
    constructor() {
        this.__portfolioValue = 0;
        this.__level = 1;
        this.__xp = 0;
        this.__gameTime = new Timer();
    }

    //setters
    set xp(newXp) { // round to 2 decimal max
        this.__xp = Math.round(newXp * 100) / 100;
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
    get xp() {
        return this.__xp;
    }
    get level() {
        return this.__level;
    }
    get gameTime() {
        return this.__gameTime;
    }
}