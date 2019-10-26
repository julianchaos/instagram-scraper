module.exports = () => {
	const hydraExpress = require( 'hydra-express' );

	hydraExpress.registerRoutes({
		'/v1': require('../src/index')
	});

	return hydraExpress;
};