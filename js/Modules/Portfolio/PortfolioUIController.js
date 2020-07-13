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
        let htmlProfile, htmlTitle;

        htmlTitle = document.createElement("p");
        htmlTitle.innerText = "VOS PROFILS";
        self.__portfolioWrapper.append(htmlTitle);

        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
        // print html profile title
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;

            if(profile.__launchedReco.length > 0) {
            // if profile has running event, dont enable click event, print cooldown
                let profileEvent = profile.__launchedReco[0];
                let cld = profileEvent.__delay - profileEvent.__timer.__duration;
                htmlProfile.innerText = profile.__name + " (" + profileEvent.__name + " : " + cld + "s)";
            }
            else {
            // if profile has no running event, enable click event to profile page
                htmlProfile.innerText = profile.__name;

                (function(self) {
                    htmlProfile.addEventListener("click", self.clickToProfile(self));
                })(self);
    
                $(htmlProfile).addClass("button");
            }

            self.__portfolioWrapper.append(htmlProfile);
            self.__portfolioProfiles.push($(htmlProfile));
        });
    }

    clear() {
        this.__portfolioWrapper.innerHTML = "";
        this.__portfolioProfiles.length = 0;
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