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
            self.__app.__eventController.__recoController.scan();
            self.__app.__eventController.__nativeController.scanToResolve();
            self.__app.__portfolioController.updateValue();
            self.__app.__UIController.printHeader(); // refresh portfolio/cash/lv values
            self.__app.__UIController.__portfolioUIController.refresh(); // refresh portfolio content (profile clds)
            
        }, self.__app.__config.__tickTime);
        // init game timer
        this.__app.__player.__gameTime.start();
    }

    yieldCash() {
        let level = this.__app.__levelsManager.getFromId(this.__app.__player.__level);
        let earnings = level.__cash;

        if(earnings) {
            this.__app.__player.__cashValue = this.__app.__player.__cashValue + earnings;
        }
        /*
        if(this.__app.__player.__portfolioValue > 0) {
           
            let earnings = this.__app.__player.__portfolioValue * this.__app.__config.__yieldRate;
            this.__app.__player.__cashValue = this.__app.__player.__cashValue + earnings;
        } */
    }

    checkIfLvUp() {
        let nextLv = this.__app.__levelsManager.getNextOf(this.__app.__player.__level);

        if(this.__app.__player.__portfolioValue >= nextLv.__thrs) {

            this.__app.__player.__level = this.__app.__player.__level + 1;
            this.__app.__UIController.levelUp();
        }
    }
}