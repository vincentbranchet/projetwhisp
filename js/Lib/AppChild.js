class AppChild {
    constructor(app) {
        this.__app = app;
    }


    get app() {
        return this.__app;
    }
}