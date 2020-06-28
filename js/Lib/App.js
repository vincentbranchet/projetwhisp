class App {
    constructor() {

        this.__player = new Player();

        this.__appController = new AppController(this);
        this.__appUIController = new AppUIController(this);
        this.__shopController = new ShopController(this);
        this.__portfolioController = new PortfolioController(this);

        this.__shopManager = new ShopManager();
        this.__portfolioManager = new PortfolioManager();
        
    }

    init() {
        this.__shopManager.init();

        this.__appUIController.printHeader();
        this.__appUIController.printShop();
        this.__appUIController.printPortfolio();

        console.log(this);
    }

    //setters

    //getters
}