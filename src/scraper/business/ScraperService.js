const hydraExpress = require('hydra-express');
const Scraper = require('./Scraper');
const { message_type } = require('./../../commom/business/internalMessaging.enum');

class ScraperService {

    set images(images) {
        const hydra = hydraExpress.getHydra();
        const serviceName = hydra.getServiceName();

        const message = hydra.createUMFMessage({
            to: serviceName + ':/',
            from: serviceName + ':/',
            type: message_type.add_images_to_database,
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
