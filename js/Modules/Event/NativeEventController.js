class NativeEventController extends EventControllerChild {
    constructor(controller) {
        super(controller);
    }

    launch(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        if(event.hasLaunched == 0) {
            event.timer.start();
            event.hasLaunched = 1;

            profile.__launchedNative.push(event);
        }
    }

    resolve(evtId, profileId) {
        let event = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);
        let profile = this.__controller.__app.__portfolioManager.getFromId(profileId);

        // apply effects to profile ; delete and add attributes
        event.toDelete.forEach(id => {
            const indexOfAtt = profile.attributes.indexOf(id);

            if(indexOfAtt >= 0) {
            // if target attribute is present in profile 
                profile.__attributes.splice(indexOfAtt, 1);
            }
        });
        event.toSpawn.forEach(id => {
            let alreadyThere = 0;
            for(let attId of profile.attributes) {
                if(attId == id) {
                    alreadyThere = 1;
                }
            }
            if(alreadyThere == 0) {
            // if target attribute is not yet present in profile
                profile.__attributes.push(id);
            }
        });

        this.__controller.__app.__profileController.evaluate(profileId, "portfolio");

        // mark as resolved, delete from launched and push to resolved
        event.timer.stop();
        event.timer.reset();
        event.wasResolved = 1;

        const indexOfEvent = profile.launchedNative.indexOf(event);
        if(indexOfEvent >= 0) {
            profile.__launchedNative.splice(indexOfEvent, 1);
            profile.__nativeEvents.push(event);    
        }

        // scan newly changed profile for native events to launch
        this.__controller.__nativeController.scanToLaunch();

        // change profile state
        profile.hasNew = true;
        
        // UI feedback
        this.__controller.__app.__notificationController.print("Le profil de " + profile.name + " a été modifié suite à un événement.", event);
        this.__controller.__app.__UIController.__newsUIController.notify();
        this.__controller.__app.__UIController.__newsUIController.refresh();
    }

    scanToLaunch() {
        var self = this;

        this.__controller.__app.__portfolioManager.profiles.forEach(profile => {
        // for each profile in player's portfolio
            if(profile.attributes) {
                for(let attId of profile.attributes) {
                // and each attribute of each profile
                    const att = this.__controller.__app.__attributeManager.getFromId(attId);

                    if(att && att.events && Array.isArray(att.events) && att.events.length > 1) {
                    // if attribute has multiple events
                        for(let evtId of att.__events) {
                        // loop through each event
                            const evt = this.__controller.__app.__eventManager.__nativeManager.getFromId(evtId);

                            if(evt && evt.required && Array.isArray(evt.required) && evt.required.length > 1) {
                            // if event has multiple required attributes
                                const nbRequired = evt.required.length;
                                let nbFound = 0;

                                for(let i = 0; i < evt.required.length; i++) {
                                // loop through required attributes
                                    for(let y = 0; y < profile.attributes.length; y++) {
                                    // and through profile attributes
                                        if(evt.required[i] == profile.attributes[y]) {
                                        // if required attribute is found, save it
                                            nbFound++;
                                        }
                                    }                                
                                }

                                if(nbFound >= nbRequired) {
                                // if enough required attributes were found, launch event
                                    self.launch(evt.id, profile.id);
                                }
                            }
                            else if(evt && evt.__required && Array.isArray(evt.required) && evt.required.length == 1) {
                            // if event has one required attribute
                                for(let coreAttId of profile.attributes) {
                                // loop again through profile attributes
                                    if(coreAttId == evt.required[0]) {
                                    // if required attribute was found, launch event
                                        self.launch(evt.id, profile.id);
                                    }
                                }
                            }              
                        }
                    }
                    else if(att && att.events && Array.isArray(att.events) && att.events.length == 1) {
                    // if attribute has 1 event
                        const evt = this.__controller.__app.__eventManager.__nativeManager.getFromId(att.events);

                        if(evt && evt.__required && Array.isArray(evt.__required) && evt.__required.length > 1) {
                        // if event has multiple required attributes
                            const nbRequired = evt.__required.length;
                            let nbFound = 0;

                            for(let i = 0; i < evt.required.length; i++) {
                            // loop through required attributes
                                for(let y = 0; y < profile.attributes.length; y++) {
                                // and through profile attributes
                                    if(evt.required[i] == profile.attributes[y]) {
                                    // if required attribute is found, save it
                                        nbFound++;
                                    }
                                }                                
                            }

                            if(nbFound >= nbRequired) {
                            // if enough required attributes were found, launch event
                                self.launch(evt.id, profile.id);
                            }
                        }
                        else if(evt && evt.required && Array.isArray(evt.required) && evt.required.length == 1) {
                        // if event has one required attribute
                            for(let coreAttId of profile.attributes) {
                            // loop again through profile attributes
                                if(coreAttId == evt.required[0]) {
                                // if required attribute was found, launch event
                                    self.launch(evt.id, profile.id);
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

        this.__controller.__app.__portfolioManager.profiles.forEach(profile => {
        // loop through portfolio profiles
            if(profile.launchedNative.length >= 1) {
            // and through profiles launched native events
                for(let event of profile.launchedNative) {
                    if(event.required && Array.isArray(event.required) && event.required.length > 1) {
                    // if launched native event has multiple required attributes
                        const attRequired = event.required.length;
                        let attFound = 0;

                        for(let evtAttId of event.required) {
                        // check if required attributes are present in profile
                            for(let profAttId of profile.attributes) {
                                if(evtAttId == profAttId) {
                                    attFound++;
                                }
                            }
                        }

                        if(attFound < attRequired) {
                        // if they are not, cancel native event
                            let trueEvent = this.__controller.__app.__eventManager.__nativeManager.getFromId(event.id);
                            trueEvent.hasLaunched = 0;
                            trueEvent.timer.stop();
                            trueEvent.timer.reset();

                            const indexOfEvent = profile.launchedNative.indexOf(event);
                            if(indexOfEvent >= 0) {
                                profile.__launchedNative.splice(indexOfEvent, 1);
                            }
                        }
                        else {
                            if(event.timer.duration >= event.delay) {
                            // if event timer >= delay, resolve event 
                                self.resolve(event.id, profile.id);

                                self.__controller.__app.__UIController.__portfolioUIController.update();

                                self.__controller.__app.__UIController.fadeIn($("#profile_" + profile.id).find(".slotProfileValue"));
                            }
                        }
                    }
                    else if(event.required && Array.isArray(event.required) && event.required.length == 1) {
                    //if launched native event has one required attribute
                        let attIsHere = 0;

                        for(let coreAttId of profile.attributes) {
                        // loop again through profile attributes
                            if(coreAttId == event.required[0]) {
                            // if attribute is still there
                                attIsHere = 1;
                            }
                        }

                        if(attIsHere == 0) {
                        // if attribute is not there anymore, cancel event
                            let trueEvent = this.__controller.__app.__eventManager.__nativeManager.getFromId(event.id);
                            trueEvent.hasLaunched = 0;
                            trueEvent.timer.stop();
                            trueEvent.timer.reset();

                            const indexOfEvent = profile.launchedNative.indexOf(event);
                            if(indexOfEvent >= 0) {
                                profile.__launchedNative.splice(indexOfEvent, 1);
                            }
                        }
                        else {
                            if(event.timer.duration >= event.delay) {
                            // and time is up
                                self.resolve(event.id, profile.id);
                                
                                self.__controller.__app.__UIController.__portfolioUIController.update();

                                self.__controller.__app.__UIController.fadeIn($("#profile_" + profile.id).find(".slotProfileValue"));
                            }
                        }
                    }
                }
            }
        });
    }
}