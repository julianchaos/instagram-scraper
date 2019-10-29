module.exports = (()=>{
    const hydraExpress = require('hydra-express');
	const express = hydraExpress.getExpress();
	const hydra = hydraExpress.getHydra();
	const InternalMessagingService = require('./commom/business/InternalMessagingService');

	let app = express.Router();

	function _initialize() {
		_configBodyParser();
		_configCors();
		_setRoutes();
		_setInternalMessaging();
	}

	function _configBodyParser() {
		const bodyParser = require('body-parser');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
	}

	function _configCors() {
		const cors = require('cors');
		app.use(cors());
	}

	function _setRoutes() {
		app.get('/', (req, res) => {
			console.log('requisition: ', req);
			console.log('response: ', res);

			res.status(200).send({message: "Hello World!"});
		});

		app.use('/scraper', require('./scraper/routes'));
	}

	function _setInternalMessaging() {
		hydra.on('message', InternalMessagingService.messageHandler);
	}

	_initialize();

	return app;
})();
