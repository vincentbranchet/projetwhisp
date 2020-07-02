class ProfileUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__profileWrapper = $(".profileWrapper")[0]; // profile page in portfolio
        this.__profileVitrineWrapper = $(".profileVitrineWrapper")[0]; // profile page in shop
    }

    // A REFACTORISER AVEC InPortfolio / InShop EN PARAMETRE DES FONCTIONS

    show(profileId) {
        this.clear();

        this.__profileWrapper.style.display = "block";

        this.print(profileId);
    }

    showInShop(profileId) {
        this.clear();

        this.__profileVitrineWrapper.style.display = "block";

        this.printInShop(profileId);
    }

    print(profileId) {
        //profile id is the profile ID as int
        var self = this;
        let htmlProfileInfo, htmlSellButton, htmlTitle, htmlRecoTitle;

        htmlProfileInfo = document.createElement("div");
        htmlSellButton = document.createElement("div");
        htmlTitle = document.createElement("p");

        htmlTitle.innerText = "PROFIL";
        self.__profileWrapper.append(htmlTitle);

        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        htmlProfileInfo.innerText = profile.__name;

        this.__profileWrapper.append(htmlProfileInfo);

        profile.__attributes.forEach(att => {
            let htmlAtt = document.createElement("p");
            htmlAtt.innerText = att.__name + " (" + att.__value + ")";
            self.__profileWrapper.append(htmlAtt);
        });

        htmlRecoTitle = document.createElement("div");
        htmlRecoTitle.innerText = "RECOMMENDATIONS";
        this.__profileWrapper.append(htmlRecoTitle);

        this.printRecosOf(profile);

        htmlSellButton.innerText = "Vendre (" + profile.__value + ")";
        $(htmlSellButton).addClass("profileSellButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToSell(self));
        }(self));

        this.__profileWrapper.append(htmlSellButton);
    }

    printInShop(profileId) {
        var self = this;
        let htmlProfileInfo, htmlSellButton, htmlTitle;

        htmlTitle = document.createElement("p");
        htmlProfileInfo = document.createElement("div");
        htmlSellButton = document.createElement("div");

        htmlTitle.innerText = "PROFIL";
        self.__profileVitrineWrapper.append(htmlTitle);

        //find profile in portfolio and get its info
        let profile = this.__controller.__app.__shopManager.getFromId(profileId);
        htmlProfileInfo.innerText = profile.__name;

        this.__profileVitrineWrapper.append(htmlProfileInfo);

        profile.__attributes.forEach(att => {
            let htmlAtt = document.createElement("p");
            htmlAtt.innerText = att.__name + " (" + att.__value + ")";
            self.__profileVitrineWrapper.append(htmlAtt);
        });

        htmlSellButton.innerText = "Acheter (" + profile.__value + ")";
        $(htmlSellButton).addClass("profileBuyButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToBuy(self));
        }(self));

        this.__profileVitrineWrapper.append(htmlSellButton);
    }

    clickToSell(self) {

        return function() {
            let profileId = this.className.split("_")[1];
            self.__controller.__app.__playerController.sell(profileId);
        }
    }

    clickToBuy(self) {

        return function() {
            let profileId = this.className.split("_")[1];
            self.__controller.__app.__playerController.buy(profileId);
        }
    }

    printRecosOf(profile) {
        var self = this;
        let htmlReco;
        let availableRecosId = self.__controller.__app.__recoController.getAvailableOf(profile);

        if(availableRecosId.length >= 1) {
            availableRecosId.forEach(recoId => {
                let reco = self.__controller.__app.__recoManager.getFromId(recoId);
    
                htmlReco = document.createElement("p");
                htmlReco.id = "reco_" + recoId;
                htmlReco.innerText = reco.__name + " (" + reco.__cld + "s)";

                self.__profileWrapper.append(htmlReco);
            });
        }
    }

    clear() {
        this.__profileWrapper.innerHTML = "";
        this.__profileVitrineWrapper.innerHTML = "";
    }

    hide() {
        this.__profileWrapper.style.display = "none";
    }

    hideFromShop() {
        this.__profileVitrineWrapper.style.display = "none";
    }
}