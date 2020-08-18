class NativeEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    launch(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        if(event.__hasLaunched == 0) {
            // start nativeEvent
            event.__timer.start();

            event.__hasLaunched = 1;
            // push native event to profile
            profile.__launchedNative.push(event);
        }
    }

    resolve(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);
        let att = this.__controller.__app.__attributeManager.getFromId(event.__nativeAttribute);

        // apply effects to profile
        event.__toDelete.forEach(id => {
            let indexOfAtt = profile.__attributes.indexOf(id);
            profile.__attributes.splice(indexOfAtt, 1);
        });

        event.__toSpawn.forEach(id => {
            profile.__attributes.push(id);
        });

        this.__controller.__app.__profileController.evaluate(profileId, "portfolio");

        // mark as resolved, delete from launched and push to resolved
        event.__timer.stop();
        event.__timer.reset();

        event.__wasResolved = 1;

        let eventIndex = profile.__launchedNative.indexOf(event);
        profile.__launchedNative.splice(eventIndex, 1);
        profile.__nativeEvents.push(event);
        
        this.__controller.__app.__notificationController.print("L'attribut " + att.__name + " de " + profile.__name + " a donné lieu à des changements");
        this.__controller.__app.__UIController.__newsUIController.notify();
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }

    scanToLaunch() {
        var self = this;

        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
        // for each profile in player's portfolio
            if(profile.__attributes) {
                for(let attId of profile.__attributes) {
                //and each attribute in each profile
                    let att = this.__controller.__app.__attributeManager.getFromId(attId);
    
                    if(att.__events && Array.isArray(att.__events)) {
                    // if attribute has multiple events
                        for(let evtId of att.__events) {
                        // loop through each event
                            let evt = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);

                            if(evt.__required && Array.isArray(evt.__required)) {
                            // if event has multiple required attributes
                                let nbRequired = evt.__required.length;
                                let nbFound = 0;

                                for(let i = 0; i < evt.__required.length; i++) {
                                // loop through required attributes
                                    for(let y = 0; y < profile.__attributes.length; y++) {
                                    // and through profile attributes
                                        if(evt.__required[i] == profile.__attributes[y]) {
                                        // if required attribute is found, save it
                                            nbFound++;
                                        }
                                    }                                
                                }

                                if(nbFound >= nbRequired) {
                                // if enough required attributes were found, launch event
                                    self.launch(evt.__id, profile.__id);
                                    console.log("attribute w/ multiple events, events w/ multiple required"+evt);
                                }
                            }
                            else if(evt.__required) {
                            // if event has one required attribute
                                for(let coreAttId of profile.__attributes) {
                                // loop again through profile attributes
                                    if(coreAttId == evt.__required) {
                                    // if required attribute was found, launch event
                                        self.launch(evt.__id, profile.__id);
                                        console.log("attribute w/ multiple events, event w/ one required"+evt);
                                    }
                                }
                            }              
                        }
                    }
                    else if(att.__events) {
                    // if attribute has 1 event
                        let evt = this.__controller.__app.__eventManager.__nativeManager.getFromId(att.__events);

                        if(evt.__required && Array.isArray(evt.__required)) {
                        // if event has multiple required attributes
                            let nbRequired = evt.__required.length;
                            let nbFound = 0;

                            for(let i = 0; i < evt.__required.length; i++) {
                            // loop through required attributes
                                for(let y = 0; y < profile.__attributes.length; y++) {
                                // and through profile attributes
                                    if(evt.__required[i] == profile.__attributes[y]) {
                                    // if required attribute is found, save it
                                        nbFound++;
                                    }
                                }                                
                            }

                            if(nbFound >= nbRequired) {
                            // if enough required attributes were found, launch event
                                self.launch(evt.__id, profile.__id);
                                console.log("attribute w/ one event, event w/ multiple required"+evt);
                            }
                        }
                        else if(evt.__required) {
                        // if event has one required attribute
                            for(let coreAttId of profile.__attributes) {
                            // loop again through profile attributes
                                if(coreAttId == evt.__required) {
                                // if required attribute was found, launch event
                                    self.launch(evt.__id, profile.__id);
                                    console.log("attribute w/ one event, event w/ one required"+evt);
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    scanToResolve() {
        var self = this;

        // loop through portfolio profiles
        this.__controller.__app.__portfolioManager.__profiles.forEach(profile => {
            if(profile.__launchedNative.length >= 1) {
            // and through profiles launched native events
                for(let event of profile.__launchedNative) {
                // check if event timer >= delay
                    if(event.__timer.__duration >= event.__delay) {
                    // if so, resolve event 
                        self.resolve(event.__id, profile.__id);
                    }
                }
            }
        });
    }
}