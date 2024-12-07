const { predictModelHandler, getAllHistoriesHandler } = require("./handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: predictModelHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getAllHistoriesHandler,
  },
];

module.exports = routes;
