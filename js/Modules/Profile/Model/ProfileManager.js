class ProfileManager {
    constructor() {
        this.__profiles = [];
    }

    init() {
        //get from json (ok way)

        //bad hack way
        this.create("Thomas", 100);
        this.create("Virginie", 200);
        this.create("Zafar", 300);
    }

    create(name, value) {
        this.__profiles.push(new Profile(name, value));
    }
}