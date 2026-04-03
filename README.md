# Redis Tweet Analysis and Cahcing

This project demonstrates how to use Redis for caching results of expensive Mongo queries in a tweet analysis application. It creates in-memory caches for the following queries:

- Query1 (20pts): Count total tweets — SET tweetCount to 0, iterate tweets collection and INCR tweetCount per tweet, then GET and print "There were ### tweets"

- Query2 (20pts): Sum all favorites — SET favoritesSum to 0, iterate tweets and INCRBY favoritesSum by each tweet's favorite count, then GET and print the total

- Query3 (20pts): Count distinct users — use a Redis Set called screen_names, add each tweet's screen_name with SADD (duplicates auto-ignored), then SCARD for the count

- Query4 (20pts): Top 10 users by tweet count — use a Redis Sorted Set called leaderboard, ZINCRBY by 1 per tweet per user, then ZREVRANGE leaderboard 0 9 WITHSCORES to get the top 10

- Query5 (30pts): Per-user tweet lookup structure — for each tweet, RPUSH tweets:<screen_name> <tweet_id> to build a list of IDs per user, and HSET tweet:<tweet_id> user_name <val> text <val> created_at <val> ... to store tweet details in a hash

## Setup

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Ensure you have a running instance of Redis and MongoDB.
4. Update the MongoDB connection string in `mongo.js` if necessary.
5. Run the queries using `npx tsx query<query_number>.ts`.


