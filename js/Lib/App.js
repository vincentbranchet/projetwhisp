class App {
    constructor() {

        this.__player = new Player();
        this.__config = new Config();

        this.__appController = new AppController(this);
        this.__UIController = new AppUIController(this);
        this.__shopController = new ShopController(this);
        this.__portfolioController = new PortfolioController(this);
        this.__playerController = new PlayerController(this);

        this.__shopManager = new ShopManager();
        this.__portfolioManager = new PortfolioManager();
        
    }

    init() {
        this.__appController.init();
        this.__shopManager.init();

        this.__UIController.update();

        console.log(this);
    }

    //setters

    //getters
}