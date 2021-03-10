const badRequestHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 400) {
    res.status(400).json({
      success: false,
      errors: err.message || "Bad Request",
    });
  }
  next(err);
};

const forbiddenError = (err, req, res, next) => {
  if (err.httpStatusCode === 403) {
    res.status(400).json({
      success: false,
      errors: err.message || "Forbidden",
    });
  }
  next(err);
};

const notFoundHandler = (err, req, res, next) => {
  if (err.httpStatusCode === 404) {
    res.status(404).json({
      success: false,
      errors: err.message || "Not Found",
    });
  }
  next(err);
};

const unauthorizedError = (err, req, res, next) => {
  if (err.httpStatusCode === 401) {
    res.status(401).json({
      success: false,
      errors: err.message || "Unauthorized",
    });
  }
  next(err);
};

const genericErrorHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(err.httpStatusCode || 500).json({
      success: false,
      errors: err.message || "Internal Server Error",
    });
  }
};

module.exports = (app) => {
  app.use(badRequestHandler);
  app.use(notFoundHandler);
  app.use(forbiddenError);
  app.use(unauthorizedError);
  app.use(genericErrorHandler);
};
