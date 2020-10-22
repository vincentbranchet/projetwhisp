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
    }

    init() {
        var self = this;

        this.__levelsManager.init()
            .then(() => this.__attributeManager.init())
            .then(() => this.__shopManager.init())
            .then(() => this.__eventManager.init())
            .then(() => this.__recoManager.init())
            .then(() => this.__newsManager.init())
            .then(() => this.__appController.init())
            .then(() => this.__portfolioManager.init())
            .then(() => this.__UIController.initMenu())
            .then(() => this.__appController.mainLoop(self.__appController.__lastTick))
            .catch(err => console.log(err));
    }
}