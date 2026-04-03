import { redisConnect } from "./client.js";
import { countDistinctUsers } from "./mongo.js";

export async function favoritesSum(): Promise<void> {
    const redis = await redisConnect();

    redis.set('totalDistinctUsers', '0');

    const sum = await countDistinctUsers();

    await redis.incrBy('totalDistinctUsers', sum);

    const new_sum = await redis.get('totalDistinctUsers');
    console.log(`Total number of distinct users: ${new_sum}`);

    await redis.quit();
}

favoritesSum().then(() => {
    console.log('Query2 completed successfully.');
    process.exit(0);
}).catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});