class ShopUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__shopWrapper = $(".shopWrapper")[0];
    }

    update() {
        var self = this;
        let profiles, htmlSlot, htmlProfile, htmlProfileName, htmlProfileValue, htmlTitle, htmlSep, htmlContent;

        // clear wrapper
        this.clear();

        // update all profile values
        this.__controller.__app.__profileController.updateShop();

        // create & fill title
        htmlTitle = document.createElement("div");
        htmlTitle.innerText = "Add a profile";
        $(htmlTitle).addClass("shopTitle");
        
        htmlSep = document.createElement("div");
        $(htmlSep).addClass("pagesSeparator");

        htmlContent = document.createElement("div");
        $(htmlContent).addClass("shopContentWrapper");

        this.__shopWrapper.append(htmlTitle);
        this.__shopWrapper.append(htmlSep);

        // for each profile in shop, sorted by value (decr) create & fill slots
        profiles = this.__controller.__app.__shopManager.inShop;
        profiles.sort((a, b) => b.value - a.value);
        profiles.forEach(profile => {

            htmlSlot = document.createElement("div");
            $(htmlSlot).addClass("slot");
    
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.id;

            if(profile.isClosed) {
                $(htmlProfile).addClass("deactivated slotProfile");
            }
            else {
                (function(self) {
                    htmlProfile.addEventListener("click", self.clickToShow(self));
                })(self);
    
                $(htmlProfile).addClass("button slotProfile");
            }

            htmlProfileName = document.createElement("div");
            htmlProfileName.innerText = profile.name;
            $(htmlProfileName).addClass("slotProfileName");
            htmlProfileValue = document.createElement("div");
            htmlProfileValue.innerText = self.__controller.formatNumber(profile.value) + "/s";
            $(htmlProfileValue).addClass("slotProfileValue");

            $(htmlProfile).append(htmlProfileName);
            $(htmlProfile).append(htmlProfileValue);

            $(htmlSlot).append(htmlProfile);

            $(htmlContent).append(htmlSlot);
        });

        this.__shopWrapper.append(htmlContent);
        
        this.__shopWrapper.style.display = "none";
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