class Config {
    constructor() {
        this.__tickTime = 1000; // ms
        this.__yieldRate = 0.05; // %
    }

    get tickTime() {
        return this.__tickTime;
    }

    get yieldRate() {
        return this.__yieldRate;
    }
}