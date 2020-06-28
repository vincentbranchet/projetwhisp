class PortfolioController extends AppChild {
    constructor(app) {
        super(app);
    }

    add(profile) {
        if(profile instanceof Profile) {
            this.__app.__portfolioManager.add(profile);
        }
    }

    remove(profile) {

    }
}