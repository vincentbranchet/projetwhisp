class Config {
    constructor() {
        this.__tickTime = 1000; // ms
    }

    get tickTime() {
        return this.__tickTime;
    }
}