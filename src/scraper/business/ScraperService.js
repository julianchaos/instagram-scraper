const Scraper = require('./Scraper');

class ScraperService {

    set images(images) {
        this._images = images;
    }
    get images() {
        return this._images;
    }

    constructor() {
        this._images = [];
    }

    async scrapUser(user) {
        let scraper = new Scraper(user);
        this.images = Array.from(await scraper.scrap());
    }

}

module.exports = ScraperService;
