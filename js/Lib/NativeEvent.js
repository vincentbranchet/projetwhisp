class NativeEvent extends GameEvent {
    constructor(id, name, delay) {
        super(id, name, delay);

        this.__required = [];
    }

    fillRequired(...ids) {

        if(Array.isArray(ids[0])) {
            for(let i = 0; i < ids[0].length; i++) {
                this.__required.push(ids[0][i]);
            }
        }
        else if(ids[0]) {
            this.__required.push(ids[0]);
        }
    }

    get required() {
        return this.__required;
    }
}