const redis = require("redis");
const client = redis.createClient();


client.on("error", function (error) {
    console.error(error);
});

client.set("foo", "bar");
client.set(["hello", "world"]);

// client.get('foo', function (err, result) {
//     console.log(result)
// })

const getDatafromRedis = (key) => {
    return new Promise((resolve, reject) => {
        if (key) {
            client.get(key, (err, result) => {
                if (err) {
                    reject(`No data found for key ${key}.`)
                } else {
                    resolve({
                        result
                    })
                }
            })
        } else {
            reject(`No key was provided to check and reterive from redis cache.`)
        }
    })
}

const datafromCache = getDatafromRedis('foo').then(res => console.log(res.result));

// console.log(datafromCache);

