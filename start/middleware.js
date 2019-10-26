module.exports = () => {
	const hydraExpress = require( 'hydra-express' );
	const app = hydraExpress.getExpressApp();

	app.use((req, res, next) => {
		next();
	});

	return app;
};