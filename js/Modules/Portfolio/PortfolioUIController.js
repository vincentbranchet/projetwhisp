class PortfolioUIController extends ControllerChild {
    constructor(controller) {
        super(controller); 

        this.__portfolioWrapper = $(".portfolioWrapper")[0];
    }

    update() {
        var self = this;
        let htmlSlot, htmlProfile, htmlTitle, htmlContent, htmlProfileName, htmlProfileValue, htmlSlotFill;

        // clear wrapper
        this.clear();

        // update profiles
        this.__controller.__app.__profileController.updatePortfolio();

        // create & fill title
        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "Portfolio";
        $(htmlTitle).addClass("portfolioTitle");

        this.__portfolioWrapper.append(htmlTitle);

        htmlContent = document.createElement("div");
        $(htmlContent).addClass("portfolioContentWrapper");

        // for each portfolio slot, create elt
        for(let i = 0; i < this.__controller.__app.__portfolioManager.__slots; i++) {

            htmlSlot = document.createElement("div");
            $(htmlSlot).addClass("slot");

            if(i < this.__controller.__app.__portfolioManager.__used) {
            // if slot is supposed to be used, fill it
                let profile = this.__controller.__app.__portfolioManager.__profiles[i];

                htmlProfile = document.createElement("div");
                htmlProfile.id = "profile_" + profile.__id;

                htmlSlotFill = document.createElement("div");
                $(htmlSlotFill).addClass("slotFill");

                if(profile.__launchedReco.length > 0) {
                // if profile has running event, dont enable click event, print cooldown

                    htmlProfileName = document.createElement("div");
                    htmlProfileName.innerText = profile.__name;
                    $(htmlProfileName).addClass("slotProfileName");
                    htmlProfileValue = document.createElement("div");
                    htmlProfileValue.innerText = profile.__value + "/s";
                    $(htmlProfileValue).addClass("slotProfileValue");
        
                    $(htmlProfile).append(htmlProfileName);
                    $(htmlProfile).append(htmlProfileValue);
                    $(htmlProfile).addClass("slotProfile");
                }
                else {
                // if profile has no running event, enable click event to profile page
                    htmlProfileName = document.createElement("div");
                    htmlProfileName.innerText = profile.__name;
                    $(htmlProfileName).addClass("slotProfileName");
                    htmlProfileValue = document.createElement("div");
                    htmlProfileValue.innerText = profile.__value + "/s";
                    $(htmlProfileValue).addClass("slotProfileValue");
        
                    $(htmlProfile).append(htmlProfileName);
                    $(htmlProfile).append(htmlProfileValue);
    
                    (function(self) {
                        htmlProfile.addEventListener("click", self.clickToProfile(self));
                    })(self);
        
                    $(htmlProfile).addClass("button slotProfile");
                }

                $(htmlSlot).append(htmlSlotFill);
                $(htmlSlot).append(htmlProfile);
            }

            $(htmlContent).append(htmlSlot);
        }

        this.__portfolioWrapper.append(htmlContent);

        this.hide();
    }

    print() {
    // each frame
        let profiles = this.__controller.__app.__portfolioManager.__profiles;

        profiles.forEach(profile => {

            if(profile.__launchedReco.length > 0) {
            // if profile has running event, dont enable click event, print cooldown
                let profileEvent = profile.__launchedReco[0];

                let centiCld = (profileEvent.__delay * 100) - profileEvent.__timer.__csDuration;
                let centiCldPerCent = Math.floor((centiCld / profileEvent.__delay * 100)) / 100 + "%";
                let jQueryProfile = "#profile_" + String(profile.__id);
                
                $(jQueryProfile).parent().find(".slotFill").css("width", centiCldPerCent);
                $(jQueryProfile).parent().css("opacity", "0.5")
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
            let profileId = this.id.split("_")[1];
            self.__controller.toProfileInPortfolio(profileId);
        }
    }
}