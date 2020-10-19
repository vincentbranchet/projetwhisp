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
        let htmltitle, htmlContent, htmlSep;
        let news, notifs, merge = [];
        news = this.__controller.__app.__newsManager.printed;
        notifs = this.__controller.__app.__notificationManager.printed;
        merge = news.concat(notifs);

        // SORT NEWS AND NOTIFS BY DATE
        merge.sort((a, b) => b.date - a.date);

        htmltitle = document.createElement("div");
        htmltitle.innerText = "Actualités";
        $(htmltitle).addClass("newsTitle");

        htmlSep = document.createElement("div");
        $(htmlSep).addClass("pagesSeparator");

        htmlContent = document.createElement("div");
        $(htmlContent).addClass("newsContentWrapper");

        this.__pageWrapper.append(htmltitle);
        this.__pageWrapper.append(htmlSep);
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
        const absoluteTimePassed = Math.abs(this.__controller.__app.__appController.gameTime - news.date);
        const minutesPassed = Math.ceil(absoluteTimePassed / (1000 * 60));

        articleWrapper = document.createElement("div");
        $(articleWrapper).addClass("articleWrapper");
        newsTitle = document.createElement("div");
        newsDate = document.createElement("div");
        newsImg = document.createElement("div");
        newsContent = document.createElement("div");

        newsTitle.innerHTML = news.title;
        newsDate.innerHTML = "Il y a "  + minutesPassed + " minute(s)";
        $(newsDate).addClass("contentDate");

        if(news.img && news.img != 0) {
            newsImg.innerHTML = news.img;
        }

        newsContent.innerHTML = news.content;

        articleWrapper.append(newsTitle);
        articleWrapper.append(newsDate);
        articleWrapper.append(newsImg);
        articleWrapper.append(newsContent);

        $(".newsContentWrapper").append(articleWrapper);

        this.__controller.fadeIn(articleWrapper);
    }

    printNotif(notif) {
        let notifWrapper, notifDate, notifText;
        const absoluteTimePassed = Math.abs(this.__controller.__app.__appController.gameTime - notif.date);
        const minutesPassed = Math.ceil(absoluteTimePassed / (1000 * 60));

        notifWrapper = document.createElement("div");
        $(notifWrapper).addClass("notifWrapper");
        notifDate = document.createElement("div");
        notifText = document.createElement("div");

        notifDate.innerHTML = "Il y a "  + minutesPassed + " minute(s)";
        $(notifDate).addClass("contentDate");
        notifText.innerHTML = notif.content;

        notifWrapper.append(notifDate);
        notifWrapper.append(notifText);

        $(".newsContentWrapper").append(notifWrapper);

        this.__controller.fadeIn(notifWrapper);
    }

    notify() {
        if(this.__isNew == 0) {

            let notif = document.createElement("span");
            let styles = {
                "font-size": "0.8em",
                "position": "absolute",
                "top": "18%",
                "right": "5%"
            };
    
            $(notif).text("1");
            $(notif).css(styles);
            $(notif).addClass("newsNotif");
            $(this.__newsButton).append(notif);
    
            this.__newsButton.style.fontWeight = "bold";
    
            this.__isNew = 1;
        }
    }

    hasClicked() {
        $(this.__newsButton).find(".newsNotif").remove();

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

    // getters

    get pageWrapper() {
        return this.__pageWrapper;
    }
    get pageButton() {
        return this.__pageButton
    }
}