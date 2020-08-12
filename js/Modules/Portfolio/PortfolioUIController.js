class PortfolioUIController extends ControllerChild {
    constructor(controller) {
        super(controller); 

        this.__portfolioWrapper = $(".portfolioWrapper")[0];
        this.__portfolioProfiles = [];
    }

    refresh() {
        this.clear();
        this.print();
    }

    print() {
        var self = this;
        let htmlSlot, htmlProfile, htmlTitle;

        this.__controller.__app.__profileController.updatePortfolio();

        htmlTitle = document.createElement("p");
        htmlTitle.innerText = "VOS PROFILS";
        this.__portfolioWrapper.append(htmlTitle);

        for(let i = 0; i < this.__controller.__app.__portfolioManager.__slots; i++) {
        // create slot
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
                    
                    htmlProfile.innerText = profile.__name + " (" + profileEvent.__name + " : " + cld + "s)";

                    $(htmlProfile).addClass("slotProfile");
                }
                else {
                // if profile has no running event, enable click event to profile page
                    htmlProfile.innerText = profile.__name;
    
                    (function(self) {
                        htmlProfile.addEventListener("click", self.clickToProfile(self));
                    })(self);
        
                    $(htmlProfile).addClass("button slotProfile");
                }

                $(htmlSlot).append(htmlProfile);
            }

            self.__portfolioWrapper.append(htmlSlot);
        }
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