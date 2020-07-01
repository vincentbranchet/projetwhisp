class AppUIController extends AppChild {
    constructor(app) {
        super(app);

        // body
        this.__shopUIController = new ShopUIController(this);
        this.__portfolioUIController = new PortfolioUIController(this);
        this.__profileUIController = new ProfileUIController(this);

        // header
        this.__headerPortfolioValue = $("#pv")[0];
        this.__headerCashValue = $("#cv")[0];

        // menu
        this.__portfolioButton = $(".portfolioButtonWrapper")[0];
        this.__shopButton = $(".shopButtonWrapper")[0];
    }

    update() {
        this.__profileUIController.hide(); // profile page hidden by default
        this.__profileUIController.hideFromShop();
        this.__shopUIController.refresh();
        this.__portfolioUIController.refresh();

        this.printHeader();
    }

    initMenu() {
        var self = this;

        (function(self) { 
            self.__portfolioButton.addEventListener("click", self.clickToPortfolio(self));
        }(self));

        (function(self) {
            self.__shopButton.addEventListener("click", self.clickToShop(self));
        }(self));

        // init news button as "show news page" click event
    }
    
    clickToPortfolio(self) {
    // from menu button
        return function() {
            self.__profileUIController.hide();
            self.__portfolioUIController.show();
        } 
    }

    clickToShop(self) {
    // from menu button
        return function() {
            self.__profileUIController.hideFromShop();
            self.__shopUIController.show();
        } 
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