import { redisConnect } from "./client.js";
import { getTotalFavorites } from "./mongo.js";

export async function favoritesSum(): Promise<void> {
    const redis = await redisConnect();

    redis.set('favoritesSum', '0');

    const sum = await getTotalFavorites();

    await redis.incrBy('favoritesSum', sum);

    const new_sum = await redis.get('favoritesSum');
    console.log(`Total number of favorites: ${new_sum}`);

    await redis.quit();
}

favoritesSum().then(() => {
    console.log('Query2 completed successfully.');
    process.exit(0);
}).catch((err: unknown) => {
    console.error(err);
    process.exit(1);
});