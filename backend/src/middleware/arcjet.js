import { aj } from "../config/arcjet.js"


export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1, // each request consume one token//
        });
        //handle denied requests

        if (decision.isDenied) {
            if (decision.reason.isRateLimit) {
                return res.status(429).json({
                    error: "Too many Request",
                    msg: "Rate limit exceed. please try later"
                })



            } else if (
                decision.reason.isBot()) {
                return res.status(403).json({
                    error: "TBot Access denied",
                    msg: "Authomated request is not allowed"
                })
            } else {
                return res.status(403).json({
                    error: "forbidden",
                    msg: "access denied by securtity policy"
                })
            }
        }

        // check for spoofed bots//

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                msg: "Malicious bot activity detected"
            })

        }
        next();


    } catch (error) {
        console.log("Arcjet middlware error", error)
        // allow request if the arcjet fails
        next();
    }
}
