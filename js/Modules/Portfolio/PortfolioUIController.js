class PortfolioUIController extends ControllerChild {
    constructor(controller) {
        super(controller); 

        this.__portfolioWrapper = $(".portfolioWrapper")[0];
    }

    update() {
        var self = this;
        let htmlSlot, htmlProfile, htmlTitle, htmlProfileName, htmlProfileValue;

        // clear wrapper
        this.clear();

        // update profiles
        this.__controller.__app.__profileController.updatePortfolio();

        // create & fill title
        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "PORTFOLIO";
        $(htmlTitle).addClass("portfolioTitle");
        this.__portfolioWrapper.append(htmlTitle);

        // for each portfolio slot, create elt
        for(let i = 0; i < this.__controller.__app.__portfolioManager.__slots; i++) {
            console.log(this.__controller.__app.__portfolioManager.__slots);
            htmlSlot = document.createElement("div");
            $(htmlSlot).addClass("slot");

            if(i < this.__controller.__app.__portfolioManager.__used) {
            // if slot is supposed to be used, fill it
                let profile = this.__controller.__app.__portfolioManager.__profiles[i];

                htmlProfile = document.createElement("div");
                htmlProfile.id = "profile_" + profile.__id;

                if(profile.__launchedReco.length > 0) {
                // if profile has running event, dont enable click event, print cooldown
                    let profileEvent = profile.__launchedReco[0];
                    let cld = profileEvent.__delay - profileEvent.__timer.__duration;

                    htmlProfileName = document.createElement("div");
                    htmlProfileName.innerText = profile.__name + " (" + cld + "s)";
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

                $(htmlSlot).append(htmlProfile);
            }

            self.__portfolioWrapper.append(htmlSlot);
        }

        this.hide();
    }

    print() {
    // each frame
        let profiles = this.__controller.__app.__portfolioManager.__profiles;

        profiles.forEach(profile => {

            if(profile.__launchedReco.length > 0) {
            // if profile has running event, dont enable click event, print cooldown
                let profileEvent = profile.__launchedReco[0];
                let cld = profileEvent.__delay - profileEvent.__timer.__duration;
                let query = "#profile_" + String(profile.__id) + " .slotProfileName";

                $(query).text(profile.__name + " (" + cld + "s)");
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