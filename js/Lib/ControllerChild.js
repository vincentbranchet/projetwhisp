class ControllerChild {
    constructor(controller) {
        this.__controller = controller;
    }

    get controller() {
        return this.__controller;
    }
}