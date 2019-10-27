module.exports = (() => {

    const hydraExpress = require('hydra-express');
    const express = hydraExpress.getExpress();
    const router = express.Router();

    const ScraperController = require('./controller');

    router.get('/user/:user', ScraperController.scrapInstagramUser);

    return router;
})();
