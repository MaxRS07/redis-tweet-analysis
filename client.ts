import { MongoClient, Db } from 'mongodb';
import { createClient } from 'redis';

const uri = 'mongodb://localhost:27017';

async function mongoConnect(): Promise<Db> {
    const client = await new MongoClient(uri).connect();
    const db = client.db('ieeevisTweets');
    console.log('Connected to MongoDB', db.databaseName);
    return db;
}

export { mongoConnect };

async function redisConnect() {
    const redis = createClient();

    redis.on('error', (err) => console.log('Redis Client Error', err));

    await redis.connect();
    console.log('Connected to Redis');
    return redis;
}

export { redisConnect };