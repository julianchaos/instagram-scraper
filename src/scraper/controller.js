module.exports = (() => {
    const ScraperService = require('./business/ScraperService');

    async function scrapInstagramUser(request, response) {
        try {
            const { user } = request.params;

            const scraperService = new ScraperService;
            scraperService.scrapUser(user);

            const data = scraperService.images;

            response.status(200).send({
                data: data,
                message: "Success"
            });

        } catch (error) {
            response.status(500).send({message: error.message});
        }
    }

    return {
        scrapInstagramUser: scrapInstagramUser,
    };
})();
