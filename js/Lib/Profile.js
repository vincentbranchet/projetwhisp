class Profile {
    constructor(name, value) {
        this.__name = name;
        this.__value = value;
    }

    get name() {
        return this.__name;
    }

    get value() {
        return this.__value;
    }
}