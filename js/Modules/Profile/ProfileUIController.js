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

        profile.__attributes.forEach(id => {
            let att = self.__controller.__app.__attributeManager.getFromId(id);
            let htmlAtt = document.createElement("p");
            
            if(att.__isMult == 1) {
            // if att is multiplier
                htmlAtt.innerText = att.__name + " (x" + att.__multRate + ")";    
            }
            else {
                htmlAtt.innerText = att.__name + " (" + att.__value + ")";
            }
            self.__profileWrapper.append(htmlAtt);
        });

        htmlRecoTitle = document.createElement("div");
        htmlRecoTitle.innerText = "RECOMMANDATIONS";
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
        this.__profileVitrineWrapper.append(htmlTitle);

        // profile controller evaluates profile, then we get profile and print it
        let profile = this.__controller.__app.__shopManager.getFromId(profileId);
        htmlProfileInfo.innerText = profile.__name;

        this.__profileVitrineWrapper.append(htmlProfileInfo);

        profile.__attributes.forEach(id => {
            let att = self.__controller.__app.__attributeManager.getFromId(id);
            let htmlAtt = document.createElement("p");

            if(att.__isMult == 1) {
                htmlAtt.innerText = att.__name + " (x" + att.__multRate + ")";
            }
            else {
                htmlAtt.innerText = att.__name + " (" + att.__value + ")";
            }
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
        let htmlReco, htmlRecoTitle, htmlRecoDesc, htmlRecoSend;
        let availableRecosId = self.__controller.__app.__recoController.getAvailableOf(profile);

        if(availableRecosId.length >= 1) {
            availableRecosId.forEach(recoId => {
                let reco = self.__controller.__app.__recoManager.getFromId(recoId);
    
                htmlReco = document.createElement("div");
                htmlRecoTitle = document.createElement("div");
                htmlRecoDesc = document.createElement("div");
                htmlRecoSend = document.createElement("div");

                $(htmlReco).addClass("recoWrapper");
                $(htmlRecoSend).addClass("button reco_" + recoId + "_" + profile.__id);

                htmlRecoTitle.innerText = reco.__name;
                htmlRecoDesc.innerText = reco.__desc;
                htmlRecoSend.innerText = "ENVOYER" + " (" + reco.__cld + "s)";

                (function(self) {
                    htmlRecoSend.addEventListener("click", self.clickToLaunch(self), true);
                }(self));

                self.__profileWrapper.append(htmlReco);
                $(htmlReco).append(htmlRecoTitle);
                $(htmlReco).append(htmlRecoDesc);
                $(htmlReco).append(htmlRecoSend);
            });
        }
    }

    clickToLaunch(self) {

        return function() {
            let recoId = this.className.split("_")[1];
            let profileId = this.className.split("_")[2];

            self.__controller.__app.__eventController.__recoController.launch(recoId, profileId);
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