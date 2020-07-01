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

        this.__shopManager = new ShopManager();
        this.__portfolioManager = new PortfolioManager();
        this.__attributeManager = new AttributeManager();
        this.__recoManager = new RecoManager();
    }

    init() {
        this.__player.__cashValue = this.__config.__cashStart;

        this.__appController.init();

        this.__shopManager.init();
        this.__attributeManager.init();

        this.__shopController.fill();
        this.__UIController.update();
        this.__UIController.initMenu();
    }

    //setters

    //getters
}