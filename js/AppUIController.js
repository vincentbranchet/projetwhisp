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

        this.__headerXpBar = $(".xpWrapper")[0];
        this.__headerXpFill = $(".xpFill")[0];

        this.__headerXp = $("#xp")[0];
        this.__headerXpCap = $("#xpCap")[0];
        this.__headerPortfolioValue = $("#pv")[0];

        // menu
        this.__portfolioButton = $(".portfolioButtonWrapper")[0];
        this.__shopButton = $(".shopButtonWrapper")[0];
        this.__newsButton = $(".newsButtonWrapper")[0];

        // pop-up
        this.__popUpWrapper = $(".popUpWrapper")[0];
        this.__opacityLayer = $(".opacityLayer")[0];

        this.__activePage = "news"; // default homepage
        this.__activeProfileId = 0;
        this.__isPaused = 0; // during pop ups
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

        this.__shopUIController.update();
        this.__portfolioUIController.update();

        this.showActive();
    }

    levelUp() {
        var self = this;

        self.printHeader();

        self.__newsUIController.refresh();
    }

    toPortfolio() {
        let self = this;
        self.hideActive(self);
        self.__portfolioUIController.show();
        self.__activePage = "portfolio";
    }

    toShop() {
        let self = this;
        self.hideActive(self);
        self.__shopUIController.show();
        self.__activePage = "shop";
    }

    toNews() {
        let self = this;
        self.hideActive(self);
        self.__newsUIController.show();
        self.__newsUIController.refresh();
        self.__activePage = "news";
    }

    toProfileInShop(profileId) {
        let self = this;
        self.hideActive(self);
        self.__profileUIController.showInShop(profileId);
        self.__activePage = "shop_profile";
    }

    toProfileInPortfolio(profileId) {
        let self = this;
        self.hideActive(self);
        self.__profileUIController.show(profileId);
        self.__activePage = "profile";
        self.__activeProfileId = profileId;
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
            self.__newsUIController.refresh();
            self.__activePage = "news";
        }
    }

    clickToConfirm(self) {
    // from pop up
        return function() {
            self.deletePopUp();
        }
    }

    clickToCredits(self) {
    // from ending pop up
        return function() {
            self.deletePopUp();
            self.printPopUp(`<p>Lazy Little Humans (v0.1 - 16/09/2020)</p>
            <p><br />Vincent Branchet - Development
            <br />Pierre Corbinais - Writing
            <br />Alexis Moroz - Design
            <br />Charles Klipfel - UI/UX
            <br />Jeremy Moirano - Integration/Balance</p>
            jeremy.moirano@gmail.com`, 2)
            self.__app.__appController.pause(self.__app.__appController.__stopMainLoop);
        }
    }

    hideActive(self) {
        if(self.__activePage == "news") {
            self.__newsUIController.hide();
        }
        else if(self.__activePage == "portfolio") {
            self.__portfolioUIController.hide();
        }
        else if(self.__activePage == "shop") {
            self.__shopUIController.hide();
        }
        else if(self.__activePage == "profile" || self.__activePage == "shop_profile") {
            self.__profileUIController.hide();
            self.__profileUIController.hideFromShop();
        }
    }

    showActive() {
        if(this.__activePage == "news") {
            this.__newsUIController.show();

            $(".portfolioButtonWrapper").css("text-decoration-line", "none");
            $(".shopButtonWrapper").css("text-decoration-line", "none");
            $(".newsButtonWrapper").css("text-decoration-line", "underline");

            this.__newsUIController.hasClicked();
        }
        else if(this.__activePage == "portfolio") {
            this.__portfolioUIController.show();

            $(".portfolioButtonWrapper").css("text-decoration-line", "underline");
            $(".shopButtonWrapper").css("text-decoration-line", "none");
            $(".newsButtonWrapper").css("text-decoration-line", "none");
        }
        else if(this.__activePage == "shop") {
            this.__shopUIController.show();

            $(".portfolioButtonWrapper").css("text-decoration-line", "none");
            $(".shopButtonWrapper").css("text-decoration-line", "underline");
            $(".newsButtonWrapper").css("text-decoration-line", "none");
        }
    }

    printHeader() {
        this.__headerGtMin.innerHTML = this.__app.__player.gameTime.min;
        this.__headerGtSec.innerHTML = this.__app.__player.gameTime.sec;

        this.__headerLv.innerHTML = this.__app.__player.level;
        this.__headerLvTitle.innerHTML = this.__app.__levelsManager.getTitleOf(this.__app.__player.level);

        this.__headerXpFill.style.width = Math.floor((this.__app.__player.xp / this.__app.__levelsManager.getFromId(this.__app.__player.level).xpCap) * 100) + "%";

        this.__headerXp.innerHTML = this.formatNumber(this.__app.__player.xp);
        this.__headerXpCap.innerHTML = this.formatNumber(this.__app.__levelsManager.getFromId(this.__app.__player.level).xpCap);

        this.__headerPortfolioValue.innerHTML = this.formatNumber(this.__app.__player.portfolioValue);
    }

    formatNumber(nb) {
        // turns integer > 1000 to K notation
        let rounded;

        if(nb > 999999) {
            rounded = Number(Math.abs(nb)/1000000).toFixed(1) + ' M';
        }
        else if(nb > 999) {
            rounded = Number(Math.abs(nb)/1000).toFixed(1) + ' K';
        }
        else {
            rounded = nb;
        }
        
        return rounded;
    }

    printContent() {
        this.__portfolioUIController.print();

        if(this.__activePage == "profile") {
            this.__profileUIController.refresh(this.__activeProfileId);
        }
    }

    printPopUp(text, end) {
        var self = this;
        let textWrapper, confirmButton;

        textWrapper = document.createElement("div");
        textWrapper.innerHTML = text;
        $(textWrapper).addClass("popUpText");

        confirmButton = document.createElement("div");

        if(end == 2) {
        // credit screen
            $(confirmButton).css("display", "none");
            
            var creditsLogo = document.createElement("div");
            $(creditsLogo).addClass("creditsLogoWrapper");
            $(creditsLogo).prepend("<img id='creditsLogo' src='img/credits_logo.png' />");

            $(textWrapper).css("user-select", "text");
        }
        else if(end == 1) {
        // end screen
            confirmButton.innerText = "Credits";
            $(confirmButton).addClass("popUpButton button");
    
            (function(self) {
                confirmButton.addEventListener("click", self.clickToCredits(self));
            }(self));
        }
        else if(end == 0) {
        // lv up & 'you can't do this' pop ups
            confirmButton.innerText = "Continue";
            $(confirmButton).addClass("popUpButton button");
    
            (function(self) {
                confirmButton.addEventListener("click", self.clickToConfirm(self));
            }(self));
        }

        this.__popUpWrapper.append(textWrapper);
        this.__popUpWrapper.append(confirmButton);

        if(typeof creditsLogo !== "undefined") {
            this.__popUpWrapper.append(creditsLogo);
        }

        this.__popUpWrapper.style.display = "flex";
        this.__opacityLayer.style.display = "block";
    }

    deletePopUp() {
        this.__popUpWrapper.innerHTML = "";
        this.__popUpWrapper.style.display = "none";
        this.__opacityLayer.style.display = "none";

        // resume game
        this.__app.__appController.resume();
    }

    fadeIn(elt) {
        $(elt).addClass("fadedOut");

        requestAnimationFrame(() => {
            $(elt).removeClass("fadedOut");
        });
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