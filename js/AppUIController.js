class AppUIController extends AppChild {
    constructor(app) {
        super(app);

        // body
        this.__shopUIController = new ShopUIController(this);
        this.__portfolioUIController = new PortfolioUIController(this);
        this.__newsUIController = new NewsUIController(this);
        this.__profileUIController = new ProfileUIController(this);

        // header
        this.__headerGtMin = $("#gtMin")[0];
        this.__headerGtSec = $("#gtSec")[0];
        this.__headerLv = $("#lv")[0];
        this.__headerLvTitle = $("#lvTitle")[0];
        this.__headerPortfolioValue = $("#pv")[0];
        this.__headerCashValue = $("#cv")[0];

        // menu
        this.__portfolioButton = $(".portfolioButtonWrapper")[0];
        this.__shopButton = $(".shopButtonWrapper")[0];
        this.__newsButton = $(".newsButtonWrapper")[0];

        this.__activePage = "portfolio"; // default homepage
    }

    update() {
        // hide potentially open profile pages
        this.__profileUIController.hide();
        this.__profileUIController.hideFromShop();

        // update shop & portfolio (& news) & header
        this.__shopUIController.refresh();
        this.__portfolioUIController.refresh();
        this.__newsUIController.refresh();
        this.printHeader();

        // show active page
        this.showActive();
    }

    initMenu() {
        var self = this;

        (function(self) { 
            self.__portfolioButton.addEventListener("click", self.clickToPortfolio(self));
        }(self));

        (function(self) {
            self.__shopButton.addEventListener("click", self.clickToShop(self));
        }(self));

        (function(self) {
            self.__newsButton.addEventListener("click", self.clickToNews(self));
        }(self));
    }

    levelUp() {
        var self = this;

        self.printHeader();

        alert("VOUS AVEZ ÉTÉ PROMU !\nNIVEAU : " + self.__app.__levelsManager.getTitleOf(self.__app.__player.__level))
    }
    
    clickToPortfolio(self) {
    // from menu button
        return function() {
            self.hideActive(self);
            self.__portfolioUIController.show();
            self.__activePage = "portfolio";
        } 
    }

    clickToShop(self) {
    // from menu button
        return function() {
            self.hideActive(self);
            self.__shopUIController.show();
            self.__activePage = "shop";
        } 
    }

    clickToNews(self) {
    // from menu button
        return function() {
            self.hideActive(self);
            self.__newsUIController.show();
            self.__activePage = "news";
        }
    }

    hideActive(self) {
        if(self.__activePage == "news") {
            self.__profileUIController.hide();
            self.__profileUIController.hideFromShop();
            self.__newsUIController.hide();
        }
        else if(self.__activePage == "portfolio") {
            self.__profileUIController.hide();
            self.__profileUIController.hideFromShop();
            self.__portfolioUIController.hide();
        }
        else if(self.__activePage == "shop") {
            self.__profileUIController.hide();
            self.__profileUIController.hideFromShop();
            self.__shopUIController.hide();
        }
    }

    showActive() {
        if(this.__activePage == "news") {
            this.__newsUIController.show();
        }
        else if(this.__activePage == "portfolio") {
            this.__portfolioUIController.show();
        }
        else if(this.__activePage == "shop") {
            this.__shopUIController.show();
        }
    }

    printHeader() {
        this.__headerGtMin.innerHTML = this.__app.__player.__gameTime.__min;
        this.__headerGtSec.innerHTML = this.__app.__player.__gameTime.__sec;

        this.__headerLv.innerHTML = this.__app.__player.__level;
       
        this.__headerLvTitle.innerHTML = this.__app.__levelsManager.getTitleOf(this.__app.__player.__level);
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