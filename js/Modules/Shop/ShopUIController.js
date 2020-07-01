class ShopUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__shopWrapper = $(".shopWrapper")[0];
    }

    refresh() {
        this.clear();
        this.show();
        this.print();
    }

    print() {
        var self = this;
        let htmlProfile;
        
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__controller.__app.__shopManager.__profiles.forEach(profile => {
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + ", " + profile.__value;

            (function(self) {
                htmlProfile.addEventListener("click", self.clickToShow(self));
            })(self);

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
            self.hide();
            self.__controller.__profileUIController.showInShop(profileId);
        }
    }
}