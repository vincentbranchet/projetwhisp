class ProfileUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__profileWrapper = $(".profileWrapper")[0];
    }

    show(profileId) {
        this.clear();

        this.__profileWrapper.style.display = "block";

        this.print(profileId);
    }

    print(profileId) {
        //profile id is the profile ID as int
        self = this;
        let htmlProfileInfo = document.createElement("div");
        let htmlSellButton = document.createElement("div");

        //find profile in portfolio and get its info
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        htmlProfileInfo.innerText = profile.__name + ", ";

        htmlSellButton.innerText = "Vendre (" + profile.__value + ")";
        $(htmlSellButton).addClass("profileSellButton profile_" + profileId);

        (function(self) {
            htmlSellButton.addEventListener("click", self.clickToSell(self));
        }(self));

        this.__profileWrapper.append(htmlProfileInfo);
        this.__profileWrapper.append(htmlSellButton);
    }

    clickToSell(self) {

        return function() {
            let profileId = this.className.split("_")[1];
            self.__controller.__app.__playerController.sell(profileId);
            self.clickToPortfolio(self);
        }
    }

    clickToPortfolio(self) {
        self.hide();
        self.__controller.__portfolioUIController.refresh();
    }

    clear() {
        this.__profileWrapper.innerHTML = "";
    }

    hide() {
        this.__profileWrapper.style.display = "none";
    }
}