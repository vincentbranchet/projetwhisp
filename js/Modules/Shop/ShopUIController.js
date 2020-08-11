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
        let htmlProfile, htmlTitle;

        // update all profile values
        this.__controller.__app.__profileController.updateShop();

        htmlTitle = document.createElement("p");
        htmlTitle.innerText = "DISPONIBLE";
        self.__shopWrapper.append(htmlTitle);
        
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__controller.__app.__shopManager.__inShop.forEach(profile => {
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + " (" + profile.__value + ")";

            (function(self) {
                htmlProfile.addEventListener("click", self.clickToShow(self));
            })(self);

            $(htmlProfile).addClass("button");
            self.__shopWrapper.append(htmlProfile);
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