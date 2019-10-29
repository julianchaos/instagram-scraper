const redis = require('redis');

class DatabaseService {
    static getClient() {
        return redis.createClient();
    }
    static saveImages(data) {
        const client = DatabaseService.getClient();

        client.sadd('images', data);
    }
}

module.exports = DatabaseService;
