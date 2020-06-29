class AppUIController extends AppChild {
    constructor(app) {
        super(app);
        // header
        this.__headerPortfolioValue = $("#pv")[0];
        this.__headerCashValue = $("#cv")[0];
        // portfolio
        this.__portfolioWrapper = $(".portfolioWrapper")[0];
        // shop
        this.__shopWrapper = $(".shopWrapper")[0];
    }

    update() {
        this.clearShop();
        this.clearPortfolio();

        this.printHeader();
        this.printShop();
        this.printPortfolio();
    }

    clearShop() {
        this.__shopWrapper.innerHTML = "";
    }

    clearPortfolio() {
        this.__portfolioWrapper.innerHTML = "";
    }

    shopProfileClicked(self) {

        return function() {       
            let profileId = this.id.split("_")[1];
            self.__app.__playerController.buy(profileId);
        }
    }

    portfolioProfileClicked(self) {

        return function() {
            let profileId = this.id.split("_")[1];
            self.__app.__playerController.sell(profileId);
        }
    }

    printHeader() {

        this.__headerPortfolioValue.innerHTML = this.__app.__player.portfolioValue;
        this.__headerCashValue.innerHTML = this.__app.__player.cashValue;
    }

    printShop() {
        var self = this;
        let htmlProfile;
        
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__app.__shopManager.__profiles.forEach(profile => {
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + ", " + profile.__value;

            (function(self) {
                htmlProfile.addEventListener("click", self.shopProfileClicked(self));
            })(self);    

            self.__shopWrapper.append(htmlProfile);
        });
    }

    printPortfolio() {
        var self = this;
        let htmlProfile;

        this.__app.__portfolioManager.__profiles.forEach(profile => {
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + ", " + profile.__value;

            (function(self) {
                htmlProfile.addEventListener("click", self.portfolioProfileClicked(self));
            })(self);

            self.__portfolioWrapper.append(htmlProfile);
        });
    }
}