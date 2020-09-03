class Config {
    constructor() {
        this.__frameTick = 50;
        this.__xpTick = 1000;
    }

    get frameTick() {
        return this.__frameTick;
    }

    get xpTick() {
        return this.__xpTick;
    }
}