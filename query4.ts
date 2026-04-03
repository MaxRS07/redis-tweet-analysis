import { redisConnect } from "./client.js";
import { getTotalFavorites, top10UsersByTweetCount } from "./mongo.js";

export async function leaderboard(): Promise<void> {
    const redis = await redisConnect();

    const users = await top10UsersByTweetCount();

    // Ensure the key has the correct type before adding sorted-set entries.
    await redis.del('leaderboard');

    await redis.zAdd('leaderboard', users.map(user => ({
        score: user.tweetCount,
        value: user.screenName
    })));

    const updated_leaderboard = await redis.zRangeWithScores('leaderboard', 0, -1, { REV: true });
    console.log('Top 10 users by tweet count:');
    updated_leaderboard.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.value} (${entry.score})`);
    });

    await redis.quit();
}

leaderboard().then(() => {
    console.log('Query4 completed successfully.');
    process.exit(0);
}).catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});

console.log([1, 2, 3].toString());