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
        this.__player.__cashValue = this.__config.__cashStart;

        this.__appController.init();

        this.__eventManager.init();
        this.__shopManager.init();
        this.__attributeManager.init();
        this.__levelsManager.init();
        this.__recoManager.init();
        this.__newsManager.init();

        this.__shopController.fill();
        this.__UIController.initMenu();
    }

    //setters

    //getters
}