class PortfolioUIController extends ControllerChild {
    constructor(controller) {
        super(controller); 

        this.__portfolioWrapper = $(".portfolioWrapper")[0];
    }

    update() {
        var self = this;
        let htmlSlot, htmlProfile, htmlTitle, htmlSep, htmlContent, htmlProfileName, htmlProfileValue, htmlSlotFill, htmlLinkToShop, htmlSlotNotif;

        // clear wrapper
        this.clear();

        // update profiles
        this.__controller.__app.__profileController.updatePortfolio();

        // create & fill title
        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "Portfolio";
        $(htmlTitle).addClass("portfolioTitle");

        htmlSep = document.createElement("div");
        $(htmlSep).addClass("pagesSeparator");

        this.__portfolioWrapper.append(htmlTitle);
        this.__portfolioWrapper.append(htmlSep);

        htmlContent = document.createElement("div");
        $(htmlContent).addClass("portfolioContentWrapper");

        // for each portfolio slot, create elt
        for(let i = 0; i < this.__controller.__app.__portfolioManager.slots; i++) {

            htmlSlot = document.createElement("div");
            $(htmlSlot).addClass("slot");

            if(i < this.__controller.__app.__portfolioManager.used) {
            // if slot is supposed to be used, fill it
                const profile = this.__controller.__app.__portfolioManager.profiles[i];

                htmlProfile = document.createElement("div");
                htmlProfile.id = "profile_" + profile.id;

                htmlSlotFill = document.createElement("div");
                $(htmlSlotFill).addClass("slotFill");

                htmlProfileName = document.createElement("div");
                htmlProfileName.innerText = profile.name;
                $(htmlProfileName).addClass("slotProfileName");

                htmlSlotNotif = document.createElement("span");
                const styles = {
                    "font-size": "0.8em",
                    "position": "absolute",
                    "font-weight": "bold",
                    "top": "40%",
                    "left": "1%"
                };
        
                if(profile.hasNew) $(htmlSlotNotif).text("NEW");
                else $(htmlSlotNotif).text("");
                $(htmlSlotNotif).css(styles);
                $(htmlSlotNotif).addClass("slotNotif");

                htmlProfileValue = document.createElement("div");
                htmlProfileValue.innerText = this.__controller.formatNumber(profile.value) + "/s";
                $(htmlProfileValue).addClass("slotProfileValue");
    
                $(htmlProfile).append(htmlProfileName);
                $(htmlProfile).append(htmlSlotNotif);
                $(htmlProfile).append(htmlProfileValue);

                if(profile.launchedReco.length > 0) {
                // if profile is on cooldown, don't allow player to click
                    $(htmlProfile).addClass("slotProfile");
                }
                else {
                // if profile is not on cld, allow player to click into profile page
                    (function(self) {
                        htmlProfile.addEventListener("click", self.clickToProfile(self));
                    })(self);
        
                    $(htmlProfile).addClass("button slotProfile");
                }

                $(htmlSlot).append(htmlSlotFill);
                $(htmlSlot).append(htmlProfile);
            }
            else {
                htmlLinkToShop = document.createElement("div");
                $(htmlLinkToShop).addClass("emptySlotLink button");
                htmlLinkToShop.innerText = "Ajouter un profil";;

                (function(self) {
                    htmlLinkToShop.addEventListener("click", self.clickToShop(self));
                })(self);
    
                $(htmlSlot).append(htmlLinkToShop);
            }

            $(htmlContent).append(htmlSlot);
        }

        this.__portfolioWrapper.append(htmlContent);

        this.hide();
    }

    print() {
    // each frame, update profiles on cooldown & send closed profiles to shop
        var self = this;
        const profiles = this.__controller.__app.__portfolioManager.__profiles;

        profiles.forEach(profile => {

            if(profile.launchedReco.length > 0) {
                const profileEvent = profile.__launchedReco[0];

                const centiCld = (profileEvent.delay * 100) - profileEvent.timer.csDuration;
                const centiCldPerCent = Math.floor((centiCld / profileEvent.delay * 100)) / 100 + "%";
                const jQueryProfile = "#profile_" + String(profile.id);
                
                $(jQueryProfile).parent().find(".slotFill").css("width", centiCldPerCent);
                $(jQueryProfile).parent().css("opacity", "0.5");
            }
            if(profile.isClosed) {
                self.__controller.__app.__playerController.sell(profile.id);
            }
        });
    }

    clear() {
        this.__portfolioWrapper.innerHTML = "";
    }

    hide() {
        this.__portfolioWrapper.style.display = "none";
    }

    show() {
        this.__portfolioWrapper.style.display = "block";
    }

    clickToProfile(self) {
        
        return function() {
            const profileId = this.id.split("_")[1];
            self.__controller.toProfileInPortfolio(profileId);
        }
    }

    clickToShop(self) {

        return function() {
            self.__controller.toShop();
        }
    }
}