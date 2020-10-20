class ProfileUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__profileWrapper = $(".profileWrapper")[0]; // profile page in portfolio
        this.__profileVitrineWrapper = $(".profileVitrineWrapper")[0]; // profile page in shop

        this.__defaultPage = "history"; // default profile subpage
        this.__activePage = this.__defaultPage; 
        this.__activeWrapper = ""; // html wrapper of active subpage
    }

    // A REFACTORISER AVEC InPortfolio / InShop EN PARAMETRE DES FONCTIONS

    refresh(profileId) {
        // hacky function called each frame to refresh profile page value
        const profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        $(".profileTitle").text(profile.name + " (" + profile.value + "/s" + ")");
    }

    show(profileId) {
        this.clear();

        this.__profileWrapper.style.display = "block";

        this.printLayout(profileId);

        if(this.__activePage == "attributes") {
            this.printAttributesOf(profileId);

            $(".profileAttButton").css("text-decoration-line", "underline");
            $(".profileRecoButton").css("text-decoration-line", "none");
            $(".profileHistButton").css("text-decoration-line", "none");

            // reset landing page 
            this.__activePage = this.__defaultPage;
        }
        else if(this.__activePage == "history") {
            this.printHistoryOf(profileId);

            $(".profileAttButton").css("text-decoration-line", "none");
            $(".profileRecoButton").css("text-decoration-line", "none");
            $(".profileHistButton").css("text-decoration-line", "underline");

            // reset landing page 
            this.__activePage = this.__defaultPage;
        }
        else if(this.__activePage == "recos") {
            this.printRecosOf(profileId);

            $(".profileAttButton").css("text-decoration-line", "none");
            $(".profileRecoButton").css("text-decoration-line", "underline");
            $(".profileHistButton").css("text-decoration-line", "none");

            // reset landing page 
            this.__activePage = this.__defaultPage;
        }
    }

    showInShop(profileId) {
        this.clear();

        this.__profileVitrineWrapper.style.display = "block";

        this.printInShop(profileId);
    }
    
    printInShop(profileId) {
        var self = this;
        const profile = this.__controller.__app.__shopManager.getFromId(profileId);
        let htmlSellButton, htmlTitle, htmlSep, htmlAttWrapper, htmlTotal, totalName, totalValue;

        htmlTitle = document.createElement("div");
        htmlTitle.innerText = profile.name + " (" + this.__controller.formatNumber(profile.value) + "/s" + ")";
        $(htmlTitle).addClass("shopTitle");

        htmlSep = document.createElement("div");
        $(htmlSep).addClass("pagesSeparator");

        htmlAttWrapper = document.createElement("div");
        $(htmlAttWrapper).addClass("attributeMainWrapper");

        profile.attributes.forEach(id => {
            const att = self.__controller.__app.__attributeManager.getFromId(id);

            if(att) {
                let htmlAtt = document.createElement("div");
                $(htmlAtt).addClass("attribute");
    
                let attName = document.createElement("span");
                attName.innerText = att.name;
    
                let attValue = document.createElement("span");
                if(att.isMult == 1) {
                // if att is multiplier
                    attValue.innerText = "x" + att.multRate;    
                }
                else if(att.value >= 0) {
                    attValue.innerText = "+" + att.value;
                }
                else if(att.value < 0) {
                    attValue.innerText = att.value;
                }
    
                $(htmlAtt).append(attName);
                $(htmlAtt).append(attValue);
                $(htmlAttWrapper).append(htmlAtt);
            }
        });

        htmlTotal = document.createElement("div");
        $(htmlTotal).addClass("attribute total");
        totalName = document.createElement("span");
        totalName.innerText = "Valeur totale";
        totalValue = document.createElement("span");
        totalValue.innerText = this.__controller.formatNumber(profile.value);

        $(htmlTotal).append(totalName);
        $(htmlTotal).append(totalValue);
        $(htmlAttWrapper).append(htmlTotal);

        htmlSellButton = document.createElement("div");
        htmlSellButton.innerText = "Ajouter";
        $(htmlSellButton).addClass("profileBuyButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToBuy(self));
        }(self));


        this.__profileVitrineWrapper.append(htmlTitle);
        this.__profileVitrineWrapper.append(htmlSep);
        this.__profileVitrineWrapper.append(htmlSellButton);
        this.__profileVitrineWrapper.append(htmlAttWrapper);
    }


    printLayout(profileId) {
        //profile id is the profile ID as int
        var self = this;
        let htmlTitle, htmlSep, htmlMenuWrapper, htmlAttButton, htmlRecoButton, htmlHistButton, htmlSellButton;
        const profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        htmlTitle = document.createElement("div");
        htmlTitle.innerText = profile.name + " (" + this.__controller.formatNumber(profile.value) + "/s" + ")";
        $(htmlTitle).addClass("portfolioTitle");
        
        htmlSep = document.createElement("div");
        $(htmlSep).addClass("pagesSeparator");
        
        htmlMenuWrapper = document.createElement("div");
        $(htmlMenuWrapper).addClass("profileMenuWrapper");

        htmlAttButton = document.createElement("div");
        htmlAttButton.innerText = "Attributs";
        $(htmlAttButton).addClass("profileAttButton button");
        (function(self) {
            htmlAttButton.addEventListener("click", self.clickToAttributes(self, profileId));
        }(self));

        htmlRecoButton = document.createElement("div");
        htmlRecoButton.innerText = "Recommandations";
        $(htmlRecoButton).addClass("profileRecoButton button");
        (function(self) {
            htmlRecoButton.addEventListener("click", self.clickToRecos(self, profileId));
        }(self));

        htmlHistButton = document.createElement("div");
        htmlHistButton.innerText = "Historique";
        $(htmlHistButton).addClass("profileHistButton button");
        (function(self) {
            htmlHistButton.addEventListener("click", self.clickToHistory(self, profileId));
        }(self));

        htmlSellButton = document.createElement("div");
        htmlSellButton.innerText = "Retirer";
        $(htmlSellButton).addClass("profileSellButton button profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToSell(self));
        }(self));

        $(htmlMenuWrapper).append(htmlAttButton);
        $(htmlMenuWrapper).append(htmlRecoButton);
        $(htmlMenuWrapper).append(htmlHistButton);

        this.__profileWrapper.append(htmlTitle);
        this.__profileWrapper.append(htmlSep);
        this.__profileWrapper.append(htmlMenuWrapper);
        this.__profileWrapper.append(htmlSellButton);
    }

    clickToSell(self) {

        return function() {
            const profileId = this.className.split("_")[1];
            self.__controller.__app.__playerController.sell(profileId);
        }
    }

    clickToBuy(self) {

        return function() {
            const profileId = this.className.split("_")[1];
            self.__controller.__app.__playerController.buy(profileId);
        }
    }

    printAttributesOf(profileId) {
        //profile id is the profile ID as int
        var self = this;
        const profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let htmlAttWrapper, htmlTotal, totalName, totalValue;
        
        htmlAttWrapper = document.createElement("div");
        $(htmlAttWrapper).addClass("attributeMainWrapper");
        this.__activeWrapper = htmlAttWrapper;

        this.__activePage = "attributes";

        profile.attributes.forEach(id => {
            let att = self.__controller.__app.__attributeManager.getFromId(id);

            if(att) {
                let htmlAtt = document.createElement("div");
                $(htmlAtt).addClass("attribute");
    
                let attName = document.createElement("span");
                attName.innerText = att.name;
    
                let attValue = document.createElement("span");
                if(att.isMult == 1) {
                // if att is multiplier
                    attValue.innerText = "x" + att.multRate;    
                }
                else if(att.value >= 0) {
                    attValue.innerText = "+" + att.value;
                }
                else if(att.value < 0) {
                    attValue.innerText = att.value;
                }
    
                $(htmlAtt).append(attName);
                $(htmlAtt).append(attValue);
                $(htmlAttWrapper).append(htmlAtt);
            }
        });

        htmlTotal = document.createElement("div");
        $(htmlTotal).addClass("attribute total");
        totalName = document.createElement("span");
        totalName.innerText = "Valeur totale";
        totalValue = document.createElement("span");
        totalValue.innerText = this.__controller.formatNumber(profile.value);

        $(htmlTotal).append(totalName);
        $(htmlTotal).append(totalValue);
        $(htmlAttWrapper).append(htmlTotal);

        this.__profileWrapper.append(htmlAttWrapper);
    }

    printHistoryOf(profileId) {
        var self = this;
        const profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let htmlHistWrapper, profileEvents;

        htmlHistWrapper = document.createElement("div");
        $(htmlHistWrapper).addClass("historyMainWrapper");
        this.__activeWrapper = htmlHistWrapper;

        this.__activePage = "history";

        profileEvents = profile.recoEvents.concat(profile.nativeEvents);

        if(profileEvents.length >= 1) {
            profileEvents.sort((a, b) => b.resolveDate - a.resolveDate);

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
        }
        else {
            let defaultText = document.createElement("div");
            $(defaultText).addClass("historyEvent");
            $(defaultText).text("Vous n'avez pas encore envoyé de recommandation à ce profil.");
            $(htmlHistWrapper).append(defaultText);
        }
        
        this.__profileWrapper.append(htmlHistWrapper);
    }

    printRecosOf(profileId) {
        var self = this;
        const profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        const availableRecosId = this.__controller.__app.__recoController.getAvailableOf(profile);
        let htmlRecoWrapper, htmlReco, htmlRecoTitle, htmlRecoSeparator, htmlRecoDesc, htmlRecoSend;

        htmlRecoWrapper = document.createElement("div");
        $(htmlRecoWrapper).addClass("recoMainWrapper");
        this.__activeWrapper = htmlRecoWrapper;

        this.__activePage = "recos";

        if(availableRecosId.length >= 1) {
            availableRecosId.forEach(recoId => {
                const reco = self.__controller.__app.__recoManager.getFromId(recoId);
    
                htmlReco = document.createElement("div");
                $(htmlReco).addClass("recoWrapper");
                
                htmlRecoTitle = document.createElement("div");
                htmlRecoTitle.innerText = reco.name;

                htmlRecoSeparator = document.createElement("div");
                $(htmlRecoSeparator).addClass("recoLineSpace");

                htmlRecoDesc = document.createElement("div");
                htmlRecoDesc.innerText = reco.desc;

                htmlRecoSend = document.createElement("div");
                $(htmlRecoSend).addClass("wholeButton button reco_" + recoId + "_" + profile.id);

                (function(self) {
                    htmlRecoSend.addEventListener("click", self.clickToLaunch(self), true);
                }(self));

                $(htmlReco).append(htmlRecoTitle);
                $(htmlReco).append(htmlRecoSeparator);
                $(htmlReco).append(htmlRecoDesc);
                $(htmlReco).append(htmlRecoSend);

                $(htmlRecoWrapper).append(htmlReco);
            });
        }

        this.__profileWrapper.append(htmlRecoWrapper);
    }

    printNativeEvent(evt) {
        let htmlEvtWrapper, htmlEvtTitle, htmlEvtDate, htmlConsWrapper;
        const absoluteTimePassed = Math.abs(this.__controller.__app.__appController.__gameTime - evt.resolveDate);
        const minutesPassed = Math.ceil(absoluteTimePassed / (1000 * 60));

        htmlEvtTitle = document.createElement("div");
        htmlEvtTitle.innerText = evt.name;

        htmlEvtDate = document.createElement("div");
        htmlEvtDate.innerHTML = "Il y a " + minutesPassed + " minutes";
        $(htmlEvtDate).addClass("contentDate");

        htmlConsWrapper = document.createElement("div");

        if(evt.toSpawn.length == 0 && evt.toDelete.length == 0) {
        // if event has no consequences
            htmlEvtTitle.innerText = "" + evt.name + " donne lieu à un événement, sans conséquences";
        }
        else {
        // if event has consequences
            htmlEvtTitle.innerText = "" + evt.name + " donne lieu à un événement";

            if(evt.toDelete.length != 0) {
                for(let attId of evt.toDelete) {

                    const att = this.__controller.__app.__attributeManager.getFromId(attId);
                    let htmlConseq = document.createElement("div");

                    htmlConseq.innerText = "[" + att.name + "] disparaît";

                    $(htmlConsWrapper).append(htmlConseq);
                }
            }
            if(evt.toSpawn.length != 0) {
                for(let attId of evt.toSpawn) {

                    const att = this.__controller.__app.__attributeManager.getFromId(attId);
                    let htmlConseq = document.createElement("div");

                    htmlConseq.innerText = "[" + att.name + "] apparaît";

                    $(htmlConsWrapper).append(htmlConseq);
                }
            }
        }

        htmlEvtWrapper = document.createElement("div");
        $(htmlEvtWrapper).append(htmlEvtDate);
        $(htmlEvtWrapper).append(htmlEvtTitle);
        $(htmlEvtWrapper).append(htmlConsWrapper);
        $(htmlEvtWrapper).addClass("historyEvent");

        return htmlEvtWrapper;
    }

    printRecoEvent(evt) {
        let htmlEvtWrapper, htmlEvtTitle, htmlEvtDate, htmlConsWrapper;
        const absoluteTimePassed = Math.abs(this.__controller.__app.__appController.__gameTime - evt.resolveDate);
        const minutesPassed = Math.ceil(absoluteTimePassed / (1000 * 60));

        htmlEvtDate = document.createElement("div");
        htmlEvtDate.innerHTML = "Il y a " + minutesPassed + " minutes";
        $(htmlEvtDate).addClass("contentDate");

        htmlEvtTitle = document.createElement("div");

        htmlConsWrapper = document.createElement("div");

        if(evt.toSpawn.length == 0 && evt.toDelete.length == 0) {
        // if event has no consequences
            htmlEvtTitle.innerText = "La recommandation " + evt.name + " n'a pas de conséquences";
        }
        else {
        // if event has consequences
            htmlEvtTitle.innerText = "La recommandation " + evt.name + " a des conséquences :";

            if(evt.toDelete.length != 0) {
                for(let attId of evt.toDelete) {

                    const att = this.__controller.__app.__attributeManager.getFromId(attId);
                    let htmlConseq = document.createElement("div");

                    htmlConseq.innerText = "[" + att.name + "] disparaît";

                    $(htmlConsWrapper).append(htmlConseq);
                }
            }
            if(evt.toSpawn.length != 0) {
                for(let attId of evt.toSpawn) {

                    const att = this.__controller.__app.__attributeManager.getFromId(attId);
                    let htmlConseq = document.createElement("div");

                    htmlConseq.innerText = "[" + att.name + "] apparaît";

                    $(htmlConsWrapper).append(htmlConseq);
                }
            }
        }

        htmlEvtWrapper = document.createElement("div");
        $(htmlEvtWrapper).append(htmlEvtDate);
        $(htmlEvtWrapper).append(htmlEvtTitle);
        $(htmlEvtWrapper).append(htmlConsWrapper);
        $(htmlEvtWrapper).addClass("historyEvent");

        return htmlEvtWrapper;
    }

    clickToLaunch(self) {

        return function() {
            const recoId = this.className.split("_")[1];
            const profileId = this.className.split("_")[2];

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