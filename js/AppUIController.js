class AppUIController extends AppChild {
    constructor(app) {
        super(app);

        this.__shopUIController = new ShopUIController(this);
        this.__portfolioUIController = new PortfolioUIController(this);
        this.__profileUIController = new ProfileUIController(this);

        // header
        this.__headerPortfolioValue = $("#pv")[0];
        this.__headerCashValue = $("#cv")[0];   
    }

    update() {
        this.__shopUIController.refresh();
        this.__portfolioUIController.refresh();

        this.printHeader();
    }

    printHeader() {

        this.__headerPortfolioValue.innerHTML = this.__app.__player.portfolioValue;
        this.__headerCashValue.innerHTML = this.__app.__player.cashValue;
    }

    // getters
    get shopUIController() {
        return this.__shopUIController;
    }
    get portfolioUIController() {
        return this.__portfolioUIController;
    }
    get profileUIController() {
        return this.__profileUIController;
    }
}