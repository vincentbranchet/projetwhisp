class NewsUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__newsWrapper = $(".newsWrapper")[0];
        this.__newsButton = $("newsButtonWrapper")[0];
        this.__isNew = 0;
    }

    refresh() {
        this.clear();
        this.print();
    }

    print() {
        let htmltitle;
        let news, notifs = [];
        news = this.__controller.__app.__newsManager.__printed;
        notifs = this.__controller.__app.__notificationManager.__printed;

        // SORT NEWS AND NOTIFS BY DATE
        
        htmltitle = document.createElement("p");
        htmltitle.innerText = "LES ACTUALITES";

        this.__newsWrapper.append(htmltitle);

        for(let i = this.__controller.__app.__newsManager.__printed.length - 1; i >= 0; i--) {
        // loop in reverse through printed news
            let newsWrapper, newsTitle, newsImg, newsContent;

            newsWrapper = document.createElement("div");
            newsTitle = document.createElement("div");
            newsImg = document.createElement("div");
            newsContent = document.createElement("div");

            newsTitle.innerHTML 
        }
    }

    notify() {
        this.__newsButton.style.fontWeight = "bold";
        this.__isNew = 1;
    }

    hasClicked() {
        this.__newsButton.style.fontWeight = "normal";
        this.__isNew = 0;
    }

    clear() {
        this.__newsWrapper.innerHTML = "";
    }

    hide() {
        this.__newsWrapper.style.display = "none";
    }

    show() {
        this.__newsWrapper.style.display = "block";
    }
}