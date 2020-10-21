class NewsController extends AppChild {
    constructor(app) {
        super(app);
    }

    publish(newsId) {
    // effective printing
        let news = this.__app.__newsManager.getNewsFromId(newsId);
        
        if(news.launchId) {
            this.__app.__eventController.__macroController.launch(news.launchId);
        }

        news.date = new Date();
        news.wasPrinted = 1;
        
        // push to printed
        this.__app.__newsManager.printed.push(news);

        this.__app.__UIController.__newsUIController.notify();

        this.__app.__UIController.__newsUIController.refresh();
    }

    print(newsId) {
    // pre-printing controls
        var self = this;
        // if newsId is defined, get news
        let news = this.__app.__newsManager.getNewsFromId(newsId);

        if(news && this.__app.__player.level >= news.lv) {
        // if news exists and player is high lv enough to see it
            if(Number.isInteger(news.delay) && news.delay > 0) {
            // if news has delay
                setTimeout(function() {
                    self.publish(newsId);
                }, news.delay * 1000);
            }
            else {
                self.publish(newsId);
            }
        }
    }
}