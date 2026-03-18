// Not Found-Handler-middleware for handling 404 errors in an Express.js application. This middleware should be placed after all other routes and middleware
export function notFoundHandler(req, res, next) {
  res.status(404).render("pages/error", {
    statusCode: 404,
    statusText: "Not Found",
    message: "The page you are looking for does not exist.",
    errorDetails: "May be underconstruction...",
    loginButton: false,
  });
}
