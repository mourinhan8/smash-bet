const { createClient } = require("redis");
import config from "@config";
const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
});

export default redisClient;
