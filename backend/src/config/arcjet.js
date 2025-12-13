import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node"
import { ENV } from './env.js'

// initialize arcjet//

export const aj = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics: ["import.src"],
    rules: [
        // shield protects our app from common attacks eg SQL, XSS,CSRF attacks//
        shield({ mode: "LIVE" }),
        // bot detection -block all bots except search engines//
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate linmiting with token bucket algorithm//
        tokenBucket({
            mode: "LIVE",
            refillRate: 10, //token added per interval
            interval: 10, // interval in seconds 
            capacity: 15, // maximum tokens in the bucket
        })

    ]
})