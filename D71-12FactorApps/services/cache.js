const { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));

const connectRedis = async () => {
    await client.connect();
    console.log('Redis connected');
};

const setCache = async (key, value, expireTime = 3600) => {
    await client.set(key, JSON.stringify(value), {
        EX: expireTime
    });
};

const getCache = async (key) => {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
};

module.exports = {
    connectRedis,
    setCache,
    getCache
};