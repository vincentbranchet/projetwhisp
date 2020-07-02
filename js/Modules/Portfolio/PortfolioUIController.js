class PortfolioUIController extends ControllerChild {
    constructor(controller) {
        super(controller); 

        this.__portfolioWrapper = $(".portfolioWrapper")[0];     
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
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + " (" + profile.__value + ")";

            (function(self) {
                htmlProfile.addEventListener("click", self.clickToProfile(self));
            })(self);

            $(htmlProfile).addClass("button");
            self.__portfolioWrapper.append(htmlProfile);
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
            self.hide();
            self.__controller.__profileUIController.show(profileId);
        }
    }
}