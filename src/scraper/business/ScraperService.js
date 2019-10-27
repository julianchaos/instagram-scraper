
class ScraperService {

    set images(image) {
        this._images.push(image);
    }
    get images() {
        return this._images;
    }

    constructor() {
        this._images = [];
    }

    scrapUser(user) {}

}

module.exports = ScraperService;
