class AppUIController extends AppChild {
    constructor(app) {
        super(app);
        // header
        this.__headerPortfolioValue = $("#pv")[0];
        this.__headerCashValue = $("#cv")[0];
        // portfolio
        this.__portfolioWrapper = $(".portfolioWrapper")[0];
    }

    printHeader() {

        this.__headerPortfolioValue.innerHTML = this.__app.__player.portfolioValue;
        this.__headerCashValue.innerHTML = this.__app.__player.cashValue;
    }

    printShop() {
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__app.__shopManager.__profiles.forEach(profile => {
            var htmlProfile = "<div>" + profile.__name + ", " + profile.__value;
            $(".shopWrapper").append(htmlProfile);
        });
    }

    printPortfolio() {
        this.__app.__portfolioManager.__profiles.forEach(profile => {
            var htmlProfile = "<div>" + profile.__name + ", " + profile.__value;
            $(".shopWrapper").append(htmlProfile);
        });
    }
}