class NewsManager {
    constructor() {
        this.__fileName = "news";
        this.__sheetName = "news";

        this.__news = [];
        this.__printed = [];
    }

    init() {
        // json
        return new Promise((resolve, reject) => {

            $.getJSON('json/' + this.__fileName + '.json', news => {
                console.log(news);
                news[this.__sheetName].map(jsonNews => this.create(jsonNews.id, jsonNews.title, jsonNews.content, jsonNews.img, jsonNews.delay, jsonNews.lv, jsonNews.launchId, jsonNews.comesFromId));
                console.log(this);
                resolve();
            })

            .fail(() => reject(new Error('getJSON error : couldn\'t load : ' + this.__fileName)));

        });
    }

    create(id, title, content, img, delay, lv, launchId, comesFromId) {
        this.__news.push(new News(id, title, content, img, delay, lv, launchId, comesFromId));
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