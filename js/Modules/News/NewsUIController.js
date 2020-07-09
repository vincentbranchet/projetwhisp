class NewsUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__newsWrapper = $(".newsWrapper")[0];
        this.__newsButton = $("newsButtonWrapper")[0];
        this.__isNew = 0;
    }

    refresh() {
        this.clear();
        this.printAll();
    }

    printAll() {
        let self = this;
        let htmltitle;
        let news, notifs, merge = [];
        news = this.__controller.__app.__newsManager.__printed;
        notifs = this.__controller.__app.__notificationManager.__printed;
        merge = news.concat(notifs);

        // SORT NEWS AND NOTIFS BY DATE
        merge.sort(function(a, b) {
            a = merge.date;
            b = merge.date;
            return a > b ? -1 : a < b ? 1 : 0;
        });
        
        htmltitle = document.createElement("p");
        htmltitle.innerText = "LES ACTUALITES";

        this.__pageWrapper.append(htmltitle);

        merge.forEach(elt => {
            if(elf instanceof News) {
                self.printNews(elt);
            }
            else if(elt instanceof Notification) {
                self.printNotif(elt);
            }
        });

        this.hasClicked();
    }

    printNews(news) {
        let articleWrapper, newsTitle, newsImg, newsContent, newsDate;

        articleWrapper = document.createElement("div");
        newsWrapper.addClass("articleWrapper");
        newsTitle = document.createElement("div");
        newsDate = document.createElement("div");
        newsImg = document.createElement("div");
        newsContent = document.createElement("div");

        newsTitle.innerHTML = news.__title;
        newsDate.innerHTML = news.__date.getHours() + "-" + news.__date.getMinutes() + "-" + news.__date.getSeconds();
        newsImg.innerHTML = news.__img;
        newsContent.innerHtml = news.__content;

        articleWrapper.append(newsTitle);
        articleWrapper.append(newsDate);
        articleWrapper.append(newsImg);
        articleWrapper.append(newsContent);

        this.__pageWrapper.append(articleWrapper);
    }

    printNotif(notif) {
        let notifWrapper, notifDate, notifText;

        notifWrapper = document.createElement("div");
        notifWrapper.addClass("notifWrapper");
        notifDate = document.createElement("div");
        notifText = docuemnt.createElement("div");

        notifDate.innerHTML = notif.__date.getHours() + "-" + notif.__date.getMinutes() + "-" + notif.__date.getSeconds();
        notifText.innerHTML = notif.__content;

        notifWrapper.append(notifDate);
        notifWrapper.append(notifText);

        this.__pageWrapper.append(notifWrapper);
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

    get pageWrapper() {
        return this.__pageWrapper;
    }
    get pageButton() {
        return this.__pageButton
    }
}