class AppController extends AppChild {
    constructor(app) {
        super(app);
    }

    fillShop() {
        var self = this;
        this.__app.__profileManager.__profiles.forEach(profile => {
            self.__app.__shopManager.add(profile);
        });
    }

    printShop() {
        var self = this;
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__app.__shopManager.__profiles.forEach(profile => {
            var htmlProfile = "<div>" + profile.__name + ", " + profile.__value;
            $(".shopWrapper").append(htmlProfile);
        });
    }
}