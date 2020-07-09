class NewsController extends AppChild {
    constructor(app) {
        super(app);
    }

    scan() {
        // loop through manager news
        // if news are meant to print at current player lv
        // and were not printed yet
        // and are not supposed to be printed following any event
        // then print them
    }

    print(newsId) {
        // get news from manager
        let news = this.__app.__newsManager.getFromId(newsId);

        // gather data and check if an event must be launched
        if(this.__app.__player.__lv >= news.__lv) {
        
            if(news.__launchId != 0) {
                this.__app.__eventController.__macroController.launch(news.__launchId);
            }

            news.__date = new Date();
            news.__wasPrinted = 1;
            
            // push to printed
            this.__app.__newsManager.__printed.push(news);

            this.__app.__UIController.__newsUIController.notify();
            this.__app.__UIController.update();
        }
    }
}