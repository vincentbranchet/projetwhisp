class Player {
    constructor() {

        this.__portfolio = new Portfolio();
        this.__cash = 0;
    }

    init() {
        // init from config
    }

    reset() {
        // new game
    }

    buy() {
        // player buys profile
    }

    sell() {
        // player sells profile
    }

    reco() {
        // player sends reco
    }

    //setters
    set cash(newCash) {
        this.__cash = newCash;
    }

    //getters
    get portfolio() {
        return this.__portfolio;
    }
    get cash() {
        return this.__cash;
    }
}