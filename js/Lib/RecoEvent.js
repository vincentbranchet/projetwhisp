class RecoEvent extends GameEvent {
    constructor(id, name, delay, recoId = 0, newsId = 0) {
        super(id, name, delay);

        this.__reco = recoId; // id of reco which launches event
        this.__newsId = newsId; // id of news to be printed after event
    }

    get reco() {
        return this.__reco;
    }
    get newsId() {
        return this.__newsId;
    }
}