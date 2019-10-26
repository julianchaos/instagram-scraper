module.exports = (() => {

	const hydraExpress = require('hydra-express');
	const requireDirectory = require('require-directory');
	const version = require('./package.json').version;
	const start = requireDirectory(module, './start');

	hydraExpress.init(start.properties.value, version, start.routes, start.middleware)
		.then((serviceInfo) => {
			console.log('serviceInfo', serviceInfo);
		})
		.catch((err) => {
			console.log('err', err);
		});

})();
