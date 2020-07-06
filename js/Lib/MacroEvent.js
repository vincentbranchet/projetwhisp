class MacroEvent extends GameEvent {
    constructor(id, name, delay, newsId) {
        super(id, name, delay);

        this.__newsCondition = newsId; // news id launching macro event
    }

    get newsCondition() {
        return this.__newsCondition;
    }
}