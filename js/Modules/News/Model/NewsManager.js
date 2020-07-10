class NewsManager {
    constructor() {

        this.__news = [];
        this.__printed = [];
    }

    init() {
        // json

        // bad way : /!\ si pas de valeur mettre 0 /!\
        this.create(1, "Portrait d'une nouvelle idole", "Ce jeune homme sorti de nulle part fait le buzz sur internet. Après cette fameuse vidéo ayant fait des millions de vues ...", 0, 2, 0, 4);
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