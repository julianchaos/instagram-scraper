const redis = require('redis');
const config = require('config');

class DatabaseService {
    static getClient() {
        return redis.createClient(`redis://${config.get('redis').url}`);
    }
    static saveImages(data) {
        const client = DatabaseService.getClient();

        client.sadd('images', data);
    }
}

module.exports = DatabaseService;
