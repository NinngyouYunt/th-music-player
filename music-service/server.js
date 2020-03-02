const errorHandler = require("errorhandler");

const app = require("./app");

// Customize Error Handler - This is where you could put local log file for any errors that happen
app.use(function (err, req, res, next) {
  const requestInfo = {
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    method: req.method
  };
  // Deal with 404 error
  if (err.status == 404) {
    res.status(err.status)
      .send(`${requestInfo.method}: ${requestInfo.url} returns status code ${err.status} with content: ${err.message}`);
    return;
  }


  // Deal with other error
  // Pass error down to print stacks
  next(err);

  // Or we can send result and log the stack in other way
  // res.status(500);
  // res.send(`Unexpected error: ${err}`);
});

// Print stack track for uncaught error (not necessary) - should not be run for production
if (app.get("env") === "development") {
  app.use(errorHandler());
}

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = server;
