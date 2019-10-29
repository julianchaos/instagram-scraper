const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

const DatabaseService = require('./DatabaseService');
const {message_type} = require('./internalMessaging.enum');

class InternalMessagingService {

    static messageHandler(message) {
        const serviceName = hydra.getServiceName();

        if (message.frm !== `${serviceName}:/`)
            return;

        if (message.typ === message_type.add_images_to_database)
            DatabaseService.saveImages(message.bdy.data);
    }
}

module.exports = InternalMessagingService;
