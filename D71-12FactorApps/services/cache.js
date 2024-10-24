const { createClient } = require('redis');

class CacheService {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL
        });
        
        this.client.on('error', (err) => console.log('Redis Client Error', err));
    }

    async connect() {
        await this.client.connect();
        console.log('Redis connected');
    }

    async set(key, value, expireTime = 3600) {
        await this.client.set(key, JSON.stringify(value), {
            EX: expireTime
        });
    }

    async get(key) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key) {
        await this.client.del(key);
    }
}

module.exports = new CacheService();