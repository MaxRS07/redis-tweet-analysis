# Redis Tweet Analysis and Cahcing

This project demonstrates how to use Redis for caching results of expensive Mongo queries in a tweet analysis application. It includes two main queries: counting distinct users and calculating the total number of favorites. The results of these queries are stored in Redis to improve performance for subsequent requests.

## Setup

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Ensure you have a running instance of Redis and MongoDB.
4. Update the MongoDB connection string in `mongo.js` if necessary.
5. Run the queries using `npx tsx query<query_number>.ts`.


