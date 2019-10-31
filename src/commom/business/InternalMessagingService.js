const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

const DatabaseService = require('./DatabaseService');
const {message_type} = require('./internalMessaging.enum');

class InternalMessagingService {
    static get serviceName() {
        return hydra.getServiceName();
    }

    static messageHandler(message) {
        if (message.frm !== `${InternalMessagingService.serviceName}:/`)
            return;

        if (message.typ === message_type.add_images_to_database)
            DatabaseService.saveImages(message.bdy.data);

        if (message.typ === message_type.process_queue)
            InternalMessagingService.processQueue(InternalMessagingService.serviceName);
    }

    static async processQueue(serviceName) {
        try {
            let message;
            while(message = await hydra.getQueuedMessage(serviceName)) {
                if (message.typ === message_type.add_images_to_database)
                    DatabaseService.saveImages(message.bdy.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static queue_saveImageToDatabase(image) {
        const message = InternalMessagingService.createMessage(message_type.add_images_to_database, {data: image});

        hydra.queueMessage(message);
    }

    static send_processQueue() {
        const message = InternalMessagingService.createMessage(message_type.process_queue, {});

        hydra.sendMessage(message);
    }

    static createMessage(type, body) {
        return hydra.createUMFMessage({
            from: `${InternalMessagingService.serviceName}:/`,
            to: `${InternalMessagingService.serviceName}:/`,
            type: type,
            body: body
        });
    }
}

module.exports = InternalMessagingService;
