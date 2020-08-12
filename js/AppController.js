class AppController extends AppChild {
    constructor(app) {
        super(app);
    }

    init() {
        var self = this;
        this.__app.__shopController.updateProfiles();

        // start tick
        setInterval(function() {
            self.yieldXp();
            self.checkIfLvUp();
            self.__app.__eventController.__recoController.scan();
            self.__app.__eventController.__nativeController.scanToResolve();
            self.__app.__portfolioController.updateValue();
            self.__app.__UIController.printHeader(); // refresh portfolio/lv values
            self.__app.__UIController.__portfolioUIController.refresh(); // refresh portfolio content (profile clds)
            
        }, self.__app.__config.__tickTime);
        // init game timer
        this.__app.__player.__gameTime.start();
    }

    yieldXp() {
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level);
        let earnings = this.__app.__player.__portfolioValue;
        
        if(this.__app.__player.__xp < lv.__xpCap) {
            this.__app.__player.__xp = this.__app.__player.__xp + earnings;
        }

        if(this.__app.__player.__xp > lv.__xpCap) {
        // if xp tick overloads threshold, level to cap
            this.__app.__player.__xp = lv.__xpCap;
        }
    }

    checkIfLvUp() {
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level);

        if(this.__app.__player.__xp >= lv.__xpCap) {

            this.__app.__player.__xp = 0;

            if(lv.__newSlot == 1) {
                this.__app.__portfolioController.newSlot();
                this.__app.__notificationController.print("Un nouvel emplacement de profil a été ajouté à votre portfolio.");
            }

            this.__app.__player.__level = this.__app.__player.__level + 1;
            
            if(lv.__profiles && Array.isArray(lv.__profiles)) {
            // profiles of CURRENT LV will be added, that's why we increment lv before
                this.__app.__shopController.updateProfiles();
                this.__app.__notificationController.print("De nouveaux profils sont disponibles.");
            }

            
            this.__app.__UIController.levelUp();
        }
    }
}