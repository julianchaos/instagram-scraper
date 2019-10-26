const config = require('config');

const package = require('./../package.json');

exports.value = {
	jwtPublicCert: '',
	cluster: false,
	maxSockets: 500,
	environment: process.env.NODE_ENV || 'development',
	logPath: '',
	logRequestHeader: true,
	logOutboundRequest: true,
	hydra: {
		serviceName: package.name,
		serviceDescription: package.description,
		serviceIP: '',
		servicePort: config.get('port'),
		serviceType: 'test',
		redis: {
			url: config.get('redis').url,
			port: config.get('redis').port,
			db: config.get('redis').db
		}
	}
};
