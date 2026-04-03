import { redisConnect } from './client.js';
import { getNumTweets } from './mongo.js';

async function query1(): Promise<void> {
    const redis = await redisConnect();

    await redis.set('tweetCount', '0');

    const [tweetCount] = await getNumTweets();

    await redis.incrBy('tweetCount', tweetCount);

    const new_count = await redis.get('tweetCount');
    console.log(`Total number of tweets: ${new_count}`);

    await redis.quit();
}

query1()
    .then(() => {
        console.log('Query1 completed successfully.');
        process.exit(0);
    })
    .catch((err: unknown) => {
        console.error(err);
        process.exit(1);
    });