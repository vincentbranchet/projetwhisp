class RecoEvent extends GameEvent {
    constructor(id, name, delay, recoId) {
        super(id, name, delay);

        this.__reco = recoId; // id of reco which launches event
    }

    get reco() {
        return this.__reco;
    }
}