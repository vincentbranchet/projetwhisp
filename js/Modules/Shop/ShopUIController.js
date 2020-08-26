class ShopUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__shopWrapper = $(".shopWrapper")[0];
    }

    refresh() {
        this.clear();
        this.print();
    }

    print() {
        var self = this;
        let htmlSlot, htmlProfile, htmlProfileName, htmlProfileValue, htmlTitle;

        // update all profile values
        this.__controller.__app.__profileController.updateShop();

        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "PROFILES";
        $(htmlTitle).addClass("shopTitle");

        self.__shopWrapper.append(htmlTitle);

        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__controller.__app.__shopManager.__inShop.forEach(profile => {

            htmlSlot = document.createElement("div");
            $(htmlSlot).addClass("slot");
    
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;

            (function(self) {
                htmlProfile.addEventListener("click", self.clickToShow(self));
            })(self);

            $(htmlProfile).addClass("button slotProfile");

            htmlProfileName = document.createElement("div");
            htmlProfileName.innerText = profile.__name;
            $(htmlProfileName).addClass("slotProfileName");
            htmlProfileValue = document.createElement("div");
            htmlProfileValue.innerText = profile.__value + "/s";
            $(htmlProfileValue).addClass("slotProfileValue");

            $(htmlProfile).append(htmlProfileName);
            $(htmlProfile).append(htmlProfileValue);

            $(htmlSlot).append(htmlProfile);

            self.__shopWrapper.append(htmlSlot);
        });
    }
    
    clear() {
        this.__shopWrapper.innerHTML = "";
    }

    hide() {
        this.__shopWrapper.style.display = "none";
    }

    show() {
        this.__shopWrapper.style.display = "block";
    }

    clickToShow(self) {

        return function() {
            let profileId = this.id.split("_")[1];
            self.__controller.toProfileInShop(profileId);
        }
    }
}