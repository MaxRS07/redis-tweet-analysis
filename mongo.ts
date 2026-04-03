import { mongoConnect } from './client.js';

export async function getNumTweets(): Promise<[number, number]> {
    const db = await mongoConnect();
    const collection = db.collection('tweet');
    const nonRetweetedCount = await collection.countDocuments({ retweeted: false });
    const count = await collection.countDocuments();
    return [count, nonRetweetedCount];
}

export async function getTotalFavorites(): Promise<number> {
    const db = await mongoConnect();
    const collection = db.collection('tweet');
    const result = await collection.aggregate([
        {
            $group: {
                _id: null,
                totalFavorites: { $sum: '$favorite_count' }
            }
        }
    ]).toArray();

    return result[0]?.totalFavorites || 0;
}

export function countDistinctUsers(): Promise<number> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongoConnect();
            const collection = db.collection('tweet');
            const distinctUsers = await collection.distinct('user.id_str');
            resolve(distinctUsers.length);
        } catch (err) {
            reject(err);
        }
    });
}

export function top10UsersByTweetCount(): Promise<{ screenName: string, tweetCount: number }[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongoConnect();
            const collection = db.collection('tweet');
            const result = await collection.aggregate([
                {
                    $group: {
                        _id: '$user.screen_name',
                        tweetCount: { $sum: 1 }
                    }
                },
                { $sort: { tweetCount: -1 } },
                { $limit: 10 }
            ]).toArray();

            resolve(result.map(item => ({ screenName: item._id, tweetCount: item.tweetCount })));
        } catch (err) {
            reject(err);
        }
    });
}

export function getTweetsByUser(): Promise<{ screenName: string, tweetIds: string[] }[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mongoConnect();
            const collection = db.collection('tweet');
            const result = await collection.aggregate([
                {
                    $group: {
                        _id: '$user.screen_name',
                        tweetIds: { $push: '$_id' }
                    }
                }
            ]).toArray();

            resolve(result.map(item => ({ screenName: item._id, tweetIds: item.tweetIds })));
        } catch (err) {
            reject(err);
        }
    });
}