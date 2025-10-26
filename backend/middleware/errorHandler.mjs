export function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const statusText = err.statusText || "Internal Server Error";
  const message = err.message || "Something went wrong!";
  const errorDetails = err.errorDetails || null;
  const loginButton = err.loginButton || false;

  res.status(statusCode).render("pages/error", {
    statusCode,
    statusText,
    message,
    errorDetails,
    loginButton,
  });
}
