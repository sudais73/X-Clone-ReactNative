import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1, // Each request consumes one token
        });

        // Handle denied requests
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                // Add rate limit headers (RFC 6585)
                res.setHeader('Retry-After', 10); // Suggest retry after 10 seconds
                return res.status(429).json({
                    error: "Too Many Requests",
                    message: "Rate limit exceeded. Please try again later.",
                    retryAfter: 10
                });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: "Bot Access Denied",
                    message: "Automated requests are not allowed."
                });
            } else {
                return res.status(403).json({
                    error: "Forbidden",
                    message: "Access denied by security policy."
                });
            }
        }

        // Check for spoofed bots
        if (decision.results && decision.results.some(
            (result) => result.reason && result.reason.isBot && result.reason.isBot() && result.reason.isSpoofed
        )) {
            return res.status(403).json({
                error: "Spoofed Bot Detected",
                message: "Malicious bot activity detected."
            });
        }

        // Attach decision to request for downstream use (optional)
        req.arcjetDecision = decision;

        next();

    } catch (error) {
        console.error("Arcjet middleware error:", error);
        // Fail open: allow the request if Arcjet service is unavailable
        // Consider logging to monitoring service
        next();
    }
};