import { redisConnect } from "./client.js";
import { getTweetsByUser } from "./mongo.js";

async function tweetsByUser() {
    const redis = await redisConnect();

    const tweetsByUser = await getTweetsByUser();

    for (const { screenName, tweetIds } of tweetsByUser) {
        await redis.sAdd(`tweets:${screenName}`, tweetIds);
    }

    await redis.quit();
}

tweetsByUser().then(() => {
    console.log('Query5 completed successfully.');
    process.exit(0);
}).catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});