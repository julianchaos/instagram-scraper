const hydraExpress = require('hydra-express');
const Scraper = require('./Scraper');

class ScraperService {

    set images(images) {
        const hydra = hydraExpress.getHydra();
        const serviceName = hydra.getServiceName();

        const message = hydra.createUMFMessage({
            to: serviceName + ':/',
            from: serviceName + ':/',
            type: 'add-images-to-database',
            body: {
                data: images
            }
        });
        hydra.sendMessage(message);

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
