class NewsUIController extends ControllerChild {
    constructor(controller) {
        super(controller);

        this.__newsWrapper = $(".newsWrapper")[0];
    }

    refresh() {
        this.clear();
        this.print();
    }

    print() {
        let htmltitle;
        
        htmltitle = document.createElement("p");
        htmltitle.innerText = "LES ACTUALITES";
        
        this.__newsWrapper.append(htmltitle);
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