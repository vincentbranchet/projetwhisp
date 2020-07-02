class AppController extends AppChild {
    constructor(app) {
        super(app);
    }

    init() {
        var self = this;
        // start tick
        setInterval(function() {
            self.yieldCash();
            self.checkIfLvUp();
            self.__app.__UIController.printHeader();
            
        }, self.__app.__config.__tickTime);
    }

    yieldCash() {
        if(this.__app.__player.__portfolioValue > 0) {
           
            let earnings = this.__app.__player.__portfolioValue * this.__app.__config.__yieldRate;
            this.__app.__player.__cashValue = this.__app.__player.__cashValue + earnings;
        }
    }

    checkIfLvUp() {
        let nextLv = this.__app.__levelsManager.getNextOf(this.__app.__player.__level);

        if(this.__app.__player.__portfolioValue >= nextLv.__thrs) {

            this.__app.__player.__level = this.__app.__player.__level + 1;
            this.__app.__UIController.levelUp();
        }
    }
}