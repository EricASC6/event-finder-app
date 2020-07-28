const { devServer } = require("./functions/api/api");

devServer.listen({ port: 8000 }, () =>
  console.log("Dev Server Starting on port 8000")
);
