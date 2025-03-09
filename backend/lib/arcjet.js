import arcjet, {tokenBucket,shield,detectBot} from "@arcjet/node";

import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        //sheild protects the server from DDoS attacks
        shield({mode:"LIVE"}),
    
        detectBot({
            //block all bots except search engines
            mode:"LIVE",
            allow:["CATEGORY:SEARCH_ENGINE"
            // see full list at https://arcjet.io/docs/bot-detection/bot-categories
            ]
        }),
    //rate limiting
        tokenBucket({
            mode:"LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
            }),
        ],
});