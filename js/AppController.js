class AppController extends AppChild {
    constructor(app) {
        super(app);

        this.__stopMainLoop = 0;

        this.__lastTick = performance.now();

        this.__lastRender = this.__lastTick;
        
        this.__lastXpTick = this.__lastTick;
    }

    init() {
        // LV 1 INJECTION
        let lv = this.__app.__levelsManager.getFromId(1);
        if(lv.__printId != "" && lv.__printId != null && lv.__printId != undefined) {
            this.__app.__newsController.print(lv.__printId);
        }
        this.__app.__shopController.updateProfiles();

        // start game timer
        this.__app.__player.__gameTime.start();
    }

    mainLoop(tFrame) {
        this.__stopMainLoop = window.requestAnimationFrame(this.mainLoop.bind(this));
        var nextTick = this.__lastTick + this.__app.__config.__frameTick;
        var numTicks = 0;

        if(tFrame > nextTick) {
            var timeSinceTick = tFrame - this.__lastTick;
            numTicks = Math.floor(timeSinceTick / this.__app.__config.__frameTick);
        }

        this.queueUpdates(numTicks); // appController updates

        /*render(tFrame); // appUIController updates*/
        this.__app.__UIController.printHeader(); // refresh portfolio/lv values
        this.__app.__UIController.printContent();
        this.__app.__UIController.showActive();

        this.__lastRender = tFrame;
    }

    queueUpdates(numTicks) {
        for(var i = 0; i < numTicks; i++) {
            this.__lastTick = this.__lastTick + this.__app.__config.__frameTick;

            /*this.update(this.__lastTick); */
            this.yieldXp(this.__lastTick);
            this.checkIfLvUp();
    
            this.__app.__eventController.__recoController.scan();
            this.__app.__eventController.__nativeController.scanToResolve();
    
            this.__app.__portfolioController.updateValue();
        }
    }

    yieldXp(currentTick) {
        let xpTick = this.__app.__config.__xpTick;
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level);
        let earnings = this.__app.__player.__portfolioValue;
        
        if(currentTick >= (this.__lastXpTick + xpTick)) {
        // if enough time has passed since last xp tick
            if(this.__app.__player.__xp < lv.__xpCap) {
            // and player has not yet completed lv

                this.__app.__player.__xp = this.__app.__player.__xp + earnings;

                this.__lastXpTick = currentTick;
            }

            if(this.__app.__player.__xp > lv.__xpCap) {
            // if xp tick overloads threshold, level to cap
                this.__app.__player.__xp = lv.__xpCap;
            }
        }
    }

    checkIfLvUp() {
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level);

        if(this.__app.__player.__xp >= lv.__xpCap) {
        // if player has reached xp objective
            this.__app.__player.__xp = 0;

            if(lv.__newSlot == 1) {
            // if lv spawns new portfolio slot
                this.__app.__portfolioController.newSlot();
                this.__app.__notificationController.print("Un nouvel emplacement de profil a été ajouté à votre portfolio.");
            }

            this.__app.__player.__level = this.__app.__player.__level + 1;
            lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level); // update var

            if(lv.__profiles != "" && lv.__profiles != null) {
            // if lv spawns new shop profiles : profiles of CURRENT LV will be added, that's why we increment lv before
                this.__app.__shopController.updateProfiles();
                this.__app.__notificationController.print("De nouveaux profils sont disponibles.");
            }

            if(lv.__printId != "" && lv.__printId != null && lv.__printId != undefined) {
            // if lv spawns news
                this.__app.__newsController.print(lv.__printId);
            }
            
            // update shop, portfolio & push notifs
            this.__app.__UIController.__shopUIController.update();
            this.__app.__UIController.__portfolioUIController.update();
            this.__app.__UIController.levelUp();
        }
    }
}