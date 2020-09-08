class NewsUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__pageWrapper = $(".newsWrapper")[0];
        this.__newsButton = $(".newsButtonWrapper")[0];
        this.__isNew = 0;
    }

    refresh() {
        this.clear();
        this.printAll();
    }

    printAll() {
        let self = this;
        let htmltitle, htmlContent;
        let news, notifs, merge = [];
        news = this.__controller.__app.__newsManager.__printed;
        notifs = this.__controller.__app.__notificationManager.__printed;
        merge = news.concat(notifs);

        // SORT NEWS AND NOTIFS BY DATE
        merge.sort((a, b) => b.date - a.date);

        htmltitle = document.createElement("div");
        htmltitle.innerText = "FEED";
        $(htmltitle).addClass("newsTitle");

        htmlContent = document.createElement("div");
        $(htmlContent).addClass("newsContentWrapper");

        this.__pageWrapper.append(htmltitle);
        this.__pageWrapper.append(htmlContent);

        merge.forEach(elt => {
            if(elt instanceof News) {
                self.printNews(elt);
            }
            else if(elt instanceof Notification) {
                self.printNotif(elt);
            }
        });
    }

    printNews(news) {
        let articleWrapper, newsTitle, newsImg, newsContent, newsDate;

        articleWrapper = document.createElement("div");
        $(articleWrapper).addClass("articleWrapper");
        newsTitle = document.createElement("div");
        newsDate = document.createElement("div");
        newsImg = document.createElement("div");
        newsContent = document.createElement("div");

        newsTitle.innerHTML = news.__title;
        newsDate.innerHTML = news.__date.getHours() + ":" + news.__date.getMinutes() + ":" + news.__date.getSeconds();
        if(news.__img && news.__img != 0) {
            newsImg.innerHTML = news.__img;
        }
        newsContent.innerHTML = news.__content;

        articleWrapper.append(newsTitle);
        articleWrapper.append(newsDate);
        articleWrapper.append(newsImg);
        articleWrapper.append(newsContent);

        $(".newsContentWrapper").append(articleWrapper);
    }

    printNotif(notif) {
        let notifWrapper, notifDate, notifText;

        notifWrapper = document.createElement("div");
        $(notifWrapper).addClass("notifWrapper");
        notifDate = document.createElement("div");
        notifText = document.createElement("div");

        notifDate.innerHTML = notif.__date.getHours() + ":" + notif.__date.getMinutes() + ":" + notif.__date.getSeconds();
        notifText.innerHTML = notif.__content;

        notifWrapper.append(notifDate);
        notifWrapper.append(notifText);

        $(".newsContentWrapper").append(notifWrapper);
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
        this.__pageWrapper.innerHTML = "";
    }

    hide() {
        this.__pageWrapper.style.display = "none";
    }

    show() {
        this.__pageWrapper.style.display = "block";
    }

    get pageWrapper() {
        return this.__pageWrapper;
    }
    get pageButton() {
        return this.__pageButton
    }
}