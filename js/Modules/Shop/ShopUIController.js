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
        let htmlProfile;
        
        //for each profile in shop, create dom elt and add it to shop wrapper
        this.__controller.__app.__shopManager.__profiles.forEach(profile => {
            
            htmlProfile = document.createElement("div");
            htmlProfile.id = "profile_" + profile.__id;
            htmlProfile.innerText = profile.__name + ", " + profile.__value;

            (function(self) {
                htmlProfile.addEventListener("click", self.profileClicked(self));
            })(self);    

            self.__shopWrapper.append(htmlProfile);
        });
    }
    
    clear() {
        this.__shopWrapper.innerHTML = "";
    }
    
    profileClicked(self) {

        return function() {       
            let profileId = this.id.split("_")[1];
            self.__controller.__app.__playerController.buy(profileId);
        }
    }
}