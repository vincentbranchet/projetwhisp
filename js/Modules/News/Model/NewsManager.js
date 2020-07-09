class NewsManager {
    constructor() {

        this.__news = [];
        this.__printed = [];
    }

    init() {
        // json

        // bad way : /!\ si pas de valeur mettre 0 /!\
        this.create();
    }

    create(id, title, content, img, lv, launchId, comesFromId) {
        this.__news.push(new News(id, title, content, img, lv, launchId, comesFromId));
    }

    getNewsFromId(newsId) {
        let targetNews;
        this.__news.forEach(news => {
            if(news.__id == newsId) {
                targetNews = news; 
            }                
        });
        return targetNews;   
    }

    getPrintedFromId(newsId) {
        let targetNews;
        this.__printed.forEach(news => {
            if(news.__id == newsId) {
                targetNews = news; 
            }                
        });
        return targetNews;   
    }

    get news() {
        return this.__news;
    }
    get printed() {
        return this.__printed;
    }
}