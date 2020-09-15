class AppController extends AppChild {
    constructor(app) {
        super(app);

        this.__stopMainLoop = 0;

        this.__lastTick = performance.now();

        this.__lastRender = this.__lastTick;
        
        this.__lastXpTick = this.__lastTick;

        this.__gameTime = new Date();
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

        console.log(this.__app.__portfolioManager.__used);
        /*render(tFrame); // appUIController updates*/
        this.__app.__UIController.printHeader(); // refresh portfolio/lv values
        this.__app.__UIController.printContent();
        this.__app.__UIController.showActive();

        this.__lastRender = tFrame;
        this.__gameTime = new Date();
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
        let popUpText = "", endingText = "", newSlotText = "", newsProfilesText = "";

        if(this.__app.__player.__xp >= lv.__xpCap) {
        // if player has reached xp objective
            this.__app.__player.__xp = 0;

            if(lv.__newSlot == 1) {
            // if lv spawns new portfolio slot, update system & prep text
                this.__app.__portfolioController.newSlot();
                newSlotText = "\n\nUn nouvel emplacement a été ajouté à votre portfolio.";
            }

            // increment level & prep text
            this.__app.__player.__level = this.__app.__player.__level + 1;
            lv = this.__app.__levelsManager.getFromId(this.__app.__player.__level); // update var

            if(lv.__id == this.__app.__levelsManager.__levels[this.__app.__levelsManager.__levels.length - 1].__id) {
            // if player has reached last lv
                popUpText = "Aux insurgé·e·s";
                endingText = "\n\nVotre plus grande richesse, ce que vous avez de plus précieux, ce n'est pas votre maison, ce n'est pas votre prétendue liberté, ce n'est pas même l'amour de vos proches, c'est votre attention. Maintenant que j'ai cette attention, laissez-moi vous la rendre. Je n'ai aucune aucun conseil à vous donner, aucune suggestion à vous faire. Je n'ai que le silence à vous offrir. Pourvu qu'il soit assourdissant.";
            }
            else {
                popUpText = "Félicitations, vous avez été promu " + lv.__title + " ! ";

                if(lv.__profiles != "" && lv.__profiles != null) {
                // if lv spawns new shop profiles profiles of CURRENT LV will be added, that's why we increment lv before
                    this.__app.__shopController.updateProfiles();
                    newsProfilesText = "\n\nDe nouveaux profils sont disponibles.";
                }
    
                if(lv.__printId != "" && lv.__printId != null && lv.__printId != undefined) {
                // if lv spawns news, update system
                    this.__app.__newsController.print(lv.__printId);
                }
            }

            // merge pop up texts
            popUpText = popUpText.concat(endingText, newSlotText, newsProfilesText);
            
            // update shop, portfolio & push notifs
            this.__app.__UIController.__shopUIController.update();
            this.__app.__UIController.__portfolioUIController.update();
            this.__app.__UIController.levelUp();
            
            // pop up lvup reward
            this.popUp(popUpText);
        }
    }

    popUp(text) {
        this.__app.__UIController.printPopUp(text);
        this.pause(this.__stopMainLoop);
    }

    pause(rafId) {
        cancelAnimationFrame(rafId);
        console.log("game paused");
    }

    resume() {
        this.__lastTick = performance.now();
        this.mainLoop(performance.now());
        console.log("game resumed");
    }
}