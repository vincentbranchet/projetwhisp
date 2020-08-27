class ProfileUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__profileWrapper = $(".profileWrapper")[0]; // profile page in portfolio
        this.__profileVitrineWrapper = $(".profileVitrineWrapper")[0]; // profile page in shop

        this.__activePage = "attributes"; // default profile subpage
        this.__activeWrapper = ""; // html wrapper of active subpage
    }

    // A REFACTORISER AVEC InPortfolio / InShop EN PARAMETRE DES FONCTIONS

    show(profileId) {
        this.clear();

        this.__profileWrapper.style.display = "block";

        this.printLayout(profileId);

        if(this.__activePage == "attributes") {
            this.printAttributesOf(profileId);
        }
        else if(this.__activePage == "history") {
            this.printHistoryOf(profileId);
        }
        else if(this.__activePage == "recos") {
            this.printRecosOf(profileId);
        }
    }

    showInShop(profileId) {
        this.clear();

        this.__profileVitrineWrapper.style.display = "block";

        this.printInShop(profileId);
    }
    
    printInShop(profileId) {
        var self = this;
        let profile = this.__controller.__app.__shopManager.getFromId(profileId);
        let htmlProfileInfo, htmlSellButton, htmlTitle, htmlAttWrapper;

        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "PROFILS";
        $(htmlTitle).addClass("shopTitle");

        htmlProfileInfo = document.createElement("div");
        htmlProfileInfo.innerText = profile.__name;
        $(htmlProfileInfo).addClass("profileTitle");
        
        htmlAttWrapper = document.createElement("div");
        $(htmlAttWrapper).addClass("attributeMainWrapper");

        profile.__attributes.forEach(id => {
            let att = self.__controller.__app.__attributeManager.getFromId(id);
            let htmlAtt = document.createElement("div");
            $(htmlAtt).addClass("attribute");
            
            if(att) {
                if(att.__isMult == 1) {
                // if att is multiplier
                    htmlAtt.innerText = att.__name + " (x" + att.__multRate + ")";    
                }
                else {
                    htmlAtt.innerText = att.__name + " (" + att.__value + ")";
                }
            }

            $(htmlAttWrapper).append(htmlAtt);
        });

        htmlSellButton = document.createElement("div");
        htmlSellButton.innerText = "Acheter (" + profile.__value + ")";
        $(htmlSellButton).addClass("profileBuyButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToBuy(self));
        }(self));

        this.__profileVitrineWrapper.append(htmlTitle);
        this.__profileVitrineWrapper.append(htmlProfileInfo);
        this.__profileVitrineWrapper.append(htmlAttWrapper)
        this.__profileVitrineWrapper.append(htmlSellButton);
    }


    printLayout(profileId) {
        //profile id is the profile ID as int
        var self = this;
        let htmlTitle, htmlProfileInfo, htmlMenuWrapper, htmlAttButton, htmlRecoButton, htmlHistButton;
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "PORTFOLIO";
        $(htmlTitle).addClass("portfolioTitle");

        htmlProfileInfo = document.createElement("div");
        htmlProfileInfo.innerText = profile.__name;
        $(htmlProfileInfo).addClass("profileTitle");
        
        htmlMenuWrapper = document.createElement("div");
        $(htmlMenuWrapper).addClass("profileMenuWrapper");

        htmlAttButton = document.createElement("div");
        htmlAttButton.innerText = "ATTRIBUTS";
        $(htmlAttButton).addClass("profileAttButton button");
        (function(self) {
            htmlAttButton.addEventListener("click", self.clickToAttributes(self, profileId));
        }(self));

        htmlRecoButton = document.createElement("div");
        htmlRecoButton.innerText = "RECOS";
        $(htmlRecoButton).addClass("profileRecoButton button");
        (function(self) {
            htmlRecoButton.addEventListener("click", self.clickToRecos(self, profileId));
        }(self));

        htmlHistButton = document.createElement("div");
        htmlHistButton.innerText = "HISTORIQUE";
        $(htmlHistButton).addClass("profileHistButton button");
        (function(self) {
            htmlHistButton.addEventListener("click", self.clickToHistory(self, profileId));
        }(self));

        $(htmlMenuWrapper).append(htmlAttButton);
        $(htmlMenuWrapper).append(htmlRecoButton);
        $(htmlMenuWrapper).append(htmlHistButton);

        this.__profileWrapper.append(htmlTitle);
        this.__profileWrapper.append(htmlProfileInfo);
        this.__profileWrapper.append(htmlMenuWrapper);
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

    printAttributesOf(profileId) {
        //profile id is the profile ID as int
        var self = this;
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let htmlAttWrapper, htmlSellButton;
        
        htmlAttWrapper = document.createElement("div");
        $(htmlAttWrapper).addClass("attributeMainWrapper");
        this.__activeWrapper = htmlAttWrapper;

        this.__activePage = "attributes";

        profile.__attributes.forEach(id => {
            let att = self.__controller.__app.__attributeManager.getFromId(id);
            let htmlAtt = document.createElement("div");
            $(htmlAtt).addClass("attribute");
            
            if(att) {
                if(att.__isMult == 1) {
                // if att is multiplier
                    htmlAtt.innerText = att.__name + " (x" + att.__multRate + ")";    
                }
                else {
                    htmlAtt.innerText = att.__name + " (" + att.__value + ")";
                }
            }

            $(htmlAttWrapper).append(htmlAtt);
        });

        htmlSellButton = document.createElement("div");
        htmlSellButton.innerText = "Vendre (" + profile.__value + ")";
        $(htmlSellButton).addClass("profileSellButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToSell(self));
        }(self));

        this.__profileWrapper.append(htmlAttWrapper);
        this.__profileWrapper.append(htmlSellButton);
    }

    printHistoryOf(profileId) {
        var self = this;
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let htmlHistWrapper, profileEvents;

        htmlHistWrapper = document.createElement("div");
        $(htmlHistWrapper).addClass("historyMainWrapper");
        this.__activeWrapper = htmlHistWrapper;

        this.__activePage = "history";

        profileEvents = profile.__recoEvents.concat(profile.__nativeEvents);

        if(profileEvents.length >= 1) {
            htmlHistWrapper = document.createElement("div");

            profileEvents.sort((a, b) => b.date - a.date);

            profileEvents.forEach(evt => {
                if(evt instanceof NativeEvent) {
                    let nativeEvt = self.printNativeEvent(evt);
                    $(nativeEvt).addClass("profileEvent");
                    $(htmlHistWrapper).append(nativeEvt);
                }
                else if(evt instanceof RecoEvent) {
                    let recoEvt = self.printRecoEvent(evt);
                    $(recoEvt).addClass("profileEvent");
                    $(htmlHistWrapper).append(recoEvt);
                }
            });

            this.__profileWrapper.append(htmlHistWrapper);
        }
    }

    printRecosOf(profileId) {
        var self = this;
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let availableRecosId = this.__controller.__app.__recoController.getAvailableOf(profile);
        let htmlRecoWrapper, htmlReco, htmlRecoTitle, htmlRecoDesc, htmlRecoSend;

        htmlRecoWrapper = document.createElement("div");
        $(htmlRecoWrapper).addClass("recoMainWrapper");
        this.__activeWrapper = htmlRecoWrapper;

        this.__activePage = "recos";

        if(availableRecosId.length >= 1) {
            availableRecosId.forEach(recoId => {
                let reco = self.__controller.__app.__recoManager.getFromId(recoId);
    
                htmlReco = document.createElement("div");
                $(htmlReco).addClass("recoWrapper");
                
                htmlRecoTitle = document.createElement("div");
                htmlRecoTitle.innerText = reco.__name;

                htmlRecoDesc = document.createElement("div");
                htmlRecoDesc.innerText = reco.__desc;

                htmlRecoSend = document.createElement("div");
                $(htmlRecoSend).addClass("button reco_" + recoId + "_" + profile.__id);
                htmlRecoSend.innerText = "ENVOYER" + " (" + reco.__cld + "s)";

                (function(self) {
                    htmlRecoSend.addEventListener("click", self.clickToLaunch(self), true);
                }(self));

                $(htmlReco).append(htmlRecoTitle);
                $(htmlReco).append(htmlRecoDesc);
                $(htmlReco).append(htmlRecoSend);

                $(htmlRecoWrapper).append(htmlReco);
            });
        }

        this.__profileWrapper.append(htmlRecoWrapper);
    }

    printNativeEvent(evt) {
        let htmlEvtWrapper, htmlEvtTitle, htmlEvtDate;

        htmlEvtTitle = document.createElement("div");
        htmlEvtTitle.innerText = evt.__name;

        htmlEvtDate = document.createElement("div");
        htmlEvtDate.innerHTML = evt.__resolveDate.getHours() + ":" + evt.__resolveDate.getMinutes() + ":" + evt.__resolveDate.getSeconds();

        htmlEvtWrapper = document.createElement("div");
        $(htmlEvtWrapper).append(htmlEvtDate);
        $(htmlEvtWrapper).append(htmlEvtTitle);
        $(htmlEvtWrapper).addClass("historyEvent");

        return htmlEvtWrapper;
    }

    printRecoEvent(evt) {
        let htmlEvtWrapper, htmlEvtTitle, htmlEvtDate;

        htmlEvtTitle = document.createElement("div");
        htmlEvtTitle.innerText = evt.__name;

        htmlEvtDate = document.createElement("div");
        htmlEvtDate.innerHTML = evt.__resolveDate.getHours() + ":" + evt.__resolveDate.getMinutes() + ":" + evt.__resolveDate.getSeconds();

        htmlEvtWrapper = document.createElement("div");
        $(htmlEvtWrapper).append(htmlEvtDate);
        $(htmlEvtWrapper).append(htmlEvtTitle);
        $(htmlEvtWrapper).addClass("historyEvent");

        return htmlEvtWrapper;
    }

    clickToLaunch(self) {

        return function() {
            let recoId = this.className.split("_")[1];
            let profileId = this.className.split("_")[2];

            self.__controller.__app.__eventController.__recoController.launch(recoId, profileId);
        }
    }

    clickToAttributes(self, profileId) {

        return function() {
            self.hideActive();
            self.__activePage = "attributes";
            self.show(profileId);
        }
    }

    clickToRecos(self, profileId) {

        return function() {
            self.hideActive();
            self.__activePage = "recos";
            self.show(profileId);
        }
    }

    clickToHistory(self, profileId) {

        return function() {
            self.hideActive();
            self.__activePage = "history";
            self.show(profileId);
        }
    }

    hideActive() {
        this.__activeWrapper.style.display = "none";
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