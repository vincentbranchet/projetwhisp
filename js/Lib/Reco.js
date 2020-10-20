class Reco {
    constructor(id, name, desc, cld, evtId, newsId, newsForbidden) {
        this.__id = id;
        this.__name = name;
        this.__desc = desc;
        this.__cld = cld;
        this.__evtId = evtId; // id of consequence event
        this.__isActive = 0;
        this.__required = []; // att ids required to show reco
        this.__forbidden = []; // att ids forbidden for reco to show
        this.__newsId = newsId; // news id required to show reco
        this.__newsForbidden = newsForbidden; // news id required to prevent reco from showing up
    }

    // id nom desc cld evt req(2, 24, 152) forb(3)

    fillRequired(...ids) {

        if(Array.isArray(ids[0])) {
            for(let i = 0; i < ids[0].length; i++) {
                this.__required.push(ids[0][i]);
            }
        }
        else if(ids[0]) {
            this.__required.push(ids[0]);
        }
    }

    fillForbidden(...ids) {

        if(Array.isArray(ids[0])) {
            for(let i = 0; i < ids[0].length; i++) {
                this.__forbidden.push(ids[0][i]);
            }
        }
        else if(ids[0]) {
            this.__forbidden.push(ids[0]);
        }
    }

    get required() {
        return this.__required;
    }
    get forbidden() {
        return this.__forbidden;
    }
    get newsId() {
        return this.__newsId;
    }
    get newsForbidden() {
        return this.__newsForbidden;
    }
    get id() {
        return this.__id;
    }
    get name() {
        return this.__name;
    }
    get desc() {
        return this.__desc;
    }
    get cld() {
        return this.__cld;
    }
    get evtId() {
        return this.__evtId;
    }
}