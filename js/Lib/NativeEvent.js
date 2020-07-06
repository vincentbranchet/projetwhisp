class NativeEvent extends GameEvent {
    constructor(id, name, delay, attId) {
        super(id, name, delay);

        this.__nativeAttribute = attId;
    }

    get nativeAttribute() {
        return this.__nativeAttribute;
    }
}