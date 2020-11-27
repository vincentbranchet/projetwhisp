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
        // lv 1 setup
        const lv = this.__app.__levelsManager.getFromId(1);
        
        this.__app.__shopController.updateProfiles();
        
        // game start popUp
        this.popUp(`<p>This is an early prototype.</p>
        <p>The experience was condensed to be played quickly and in one go, while presenting early, mid and late game. Localization was homemade by non-natives.</p>`, -1);

        if(lv.printId != "" && lv.printId != null && lv.printId != undefined) {
        // if news are to be printed
            if(lv.printId.length >= 1) {
                for(let newsId of lv.printId) {
                    this.__app.__newsController.print(newsId);   
                }
            }
            else this.__app.__newsController.print(lv.printId);
        }


        // start game timer
        this.__app.__player.__gameTime.start();
    }

    mainLoop(tFrame) {
        this.__stopMainLoop = window.requestAnimationFrame(this.mainLoop.bind(this));
        const nextTick = this.__lastTick + this.__app.__config.frameTick;
        let numTicks = 0;

        if(tFrame > nextTick) {
            const timeSinceTick = tFrame - this.__lastTick;
            numTicks = Math.floor(timeSinceTick / this.__app.__config.frameTick);
        }

        this.queueUpdates(numTicks); // appController updates

        this.__app.__UIController.printHeader(); // refresh portfolio/lv values
        this.__app.__UIController.printContent();
        this.__app.__UIController.showActive();

        this.__lastRender = tFrame;
        this.__gameTime = new Date();
    }

    queueUpdates(numTicks) {
        for(let i = 0; i < numTicks; i++) {
            this.__lastTick = this.__lastTick + this.__app.__config.frameTick;

            this.yieldXp(this.__lastTick);
            this.checkIfLvUp();
    
            this.__app.__eventController.__recoController.scan();
            this.__app.__eventController.__nativeController.scanToResolve();
    
            this.__app.__portfolioController.updateValue();
        }
    }

    yieldXp(currentTick) {
        const xpTick = this.__app.__config.xpTick;
        const lv = this.__app.__levelsManager.getFromId(this.__app.__player.level);
        const earnings = this.__app.__player.portfolioValue;
        
        if(currentTick >= (this.__lastXpTick + xpTick)) {
        // if enough time has passed since last xp tick
            if(this.__app.__player.xp < lv.xpCap) {
            // and player has not yet completed lv
                this.__app.__player.xp = this.__app.__player.xp + earnings;

                this.__lastXpTick = currentTick;
            }

            if(this.__app.__player.xp > lv.xpCap) {
            // if xp tick overloads threshold, level to cap
                this.__app.__player.xp = lv.xpCap;
            }
        }
    }

    checkIfLvUp() {
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.level);
        let popUpText = "", endingText = "", newSlotText = "", newsProfilesText = "", end = 0;

        if(this.__app.__player.xp >= lv.xpCap) {
        // if player has reached xp objective
            this.__app.__player.xp = 0;

            if(lv.newSlot == 1) {
            // if lv spawns new portfolio slot, update system 
                this.__app.__portfolioController.newSlot();
            }

            // increment level & prep text
            this.__app.__player.level = this.__app.__player.level + 1;
            lv = this.__app.__levelsManager.getFromId(this.__app.__player.level); // update var

            if(lv.id == this.__app.__levelsManager.levels[this.__app.__levelsManager.levels.length - 1].id) {
            // if player has reached last lv
                popUpText = "<p class='centered'>End</p>";
                endingText = `<p>Thanks for playing this demo version, the final one will include:
                                <br />- Visuals & animations
                                <br />- Bark dialog
                                <br />- More rewards, more upgrades, more content!</p>`;
                end = 1;
            }
            else {
                popUpText = "<p>You were promoted " + lv.title + "</p>";

                if(lv.profiles != "" && lv.profiles != null) {
                // if lv spawns new shop profiles profiles of CURRENT LV will be added, that's why we increment lv before
                    this.__app.__shopController.updateProfiles();
                }
    
                if(lv.printId != "" && lv.printId != null && lv.printId != undefined) {
                // if lv spawns news, update system
                    if(lv.printId.length >= 1) {
                        for(let newsId of lv.printId) {
                            this.__app.__newsController.print(newsId);   
                        }
                    }
                    else this.__app.__newsController.print(lv.printId);
                }
            }

            // merge pop up texts
            popUpText = popUpText.concat(endingText, newSlotText, newsProfilesText);
            
            // update shop, portfolio & push notifs
            this.__app.__UIController.__shopUIController.update();
            this.__app.__UIController.__portfolioUIController.update();
            this.__app.__UIController.levelUp();
            
            // pop up lvup reward
            this.popUp(popUpText, end);
        }
    }

    sellOut() {
        // when player closes a profile, he gets instant amout of xp = 10% of current lv xp cap
        let lv = this.__app.__levelsManager.getFromId(this.__app.__player.level);

        this.__app.__player.xp += Math.round(lv.xpCap * 0.25);
    }

    popUp(text, end) {
        this.__app.__UIController.printPopUp(text, end);
        this.pause(this.__stopMainLoop);
    }

    pause(rafId) {
        cancelAnimationFrame(rafId);
    }

    resume() {
        this.__lastTick = performance.now();
        this.mainLoop(performance.now());
    }

    // getters

    get gameTime() {
        return this.__gameTime;
    }
}