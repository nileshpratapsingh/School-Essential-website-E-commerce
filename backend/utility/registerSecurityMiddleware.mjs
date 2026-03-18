/*
 *  Register security middleware
 */

// Security Modules

// import xss from "xss-clean";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 1000,
//     message: "Too many requests from this IP, please try again later.",
// });

// export default function securityMiddleWares(app) {
//     // Security middlewares
//     app.use([
//         // xss(),
//         helmet(),
//         mongoSanitize(),
//         limiter,
//     ]);
// }
