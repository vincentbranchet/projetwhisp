class App {
    constructor() {

        this.__player = new Player();
        this.__config = new Config();

        this.__appController = new AppController(this);
        this.__UIController = new AppUIController(this);
        this.__shopController = new ShopController(this);
        this.__portfolioController = new PortfolioController(this);
        this.__playerController = new PlayerController(this);
        this.__recoController = new RecoController(this);
        this.__eventController = new GameEventController(this);
        this.__notificationController = new NotificationController(this);
        this.__newsController = new NewsController(this);
        this.__profileController = new ProfileController(this);

        this.__shopManager = new ShopManager();
        this.__portfolioManager = new PortfolioManager();
        this.__attributeManager = new AttributeManager();
        this.__recoManager = new RecoManager();
        this.__levelsManager = new LevelsManager();
        this.__eventManager = new GameEventManager();
        this.__newsManager = new NewsManager();
        this.__notificationManager = new NotificationManager();

        this.__stopMainLoop;
        this.__lastTick = performance.now();
        this.__lastRender = this.__lastTick;
    }

    init() {

        this.__levelsManager.init()
            .then(() => this.__attributeManager.init())
            .then(() => this.__shopManager.init())
            .then(() => this.__eventManager.init())
            .then(() => this.__recoManager.init())
            .then(() => this.__newsManager.init())
            .then(() => this.__appController.init())
            .then(() => this.__portfolioManager.init())
            .then(() => this.__UIController.initMenu())
            .catch(err => console.log(err));

        this.mainLoop(performance.now());
    }

    mainLoop(tFrame) {
        this.__stopMainLoop = window.requestAnimationFrame(this.mainLoop.bind(this));
        var nextTick = this.__lastTick + this.__config.__tickTime;
        var numTicks = 0;

        if(tFrame > nextTick) {
            var timeSinceTick = tFrame - this.__lastTick;
            numTicks = Math.floor(timeSinceTick / this.__config.__tickTime);
        }

        this.queueUpdates(numTicks); // appController updates

        /*render(tFrame); // appUIController updates*/
        this.__UIController.printHeader(); // refresh portfolio/lv values
        this.__UIController.showActive();

        this.__lastRender = tFrame;
    }

    queueUpdates(numTicks) {
        for(var i = 0; i < numTicks; i++) {
            console.log(numTicks);
            this.__lastTick = this.__lastTick + this.__config.__tickTime;

            /*this.update(this.__lastTick); */
            this.__appController.yieldXp();
            this.__appController.checkIfLvUp();
    
            this.__eventController.__recoController.scan();
            this.__eventController.__nativeController.scanToResolve();
    
            this.__portfolioController.updateValue();
        }
    }
}