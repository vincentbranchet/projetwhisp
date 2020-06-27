class App {
    constructor() {
        this.__appController = new AppController(this);

        this.__profileManager = new ProfileManager();
        this.__shopManager = new ShopManager();
    }

    init() {
        this.__profileManager.init();

        this.__appController.fillShop();

        console.log(this);

        this.__appController.printShop();
    }

    //setters

    //getters
}