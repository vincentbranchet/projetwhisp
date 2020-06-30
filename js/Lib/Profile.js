class Profile {
    constructor(id, name) {
        this.__id = id;
        this.__name = name;
        this.__attributes = [];
        this.__value = 0;
    }

    init(...attributes) {
        var self = this;
        
        for(let att of attributes) {
            self.__attributes.push(att);
        }

        self.refresh();
    }

    refresh() {
        var self = this;
        self.__value = 0;

        this.__attributes.forEach(att => {
            self.__value = self.__value + att.__value;
        });
    }

    get attributes() {
        return this.__attributes;
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get value() {
        return this.__value;
    }
}