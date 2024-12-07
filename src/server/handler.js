const predictModel = require("../services/inferenceService");
const crypto = require("crypto");
const { storeData, getAllHistoriesData } = require("../services/FirebaseHandler");

async function predictModelHandler(req, h) {
  const { image } = req.payload;
  const { model } = req.server.app;

  const { result, suggestion } = await predictModel(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: result,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data: data,
  });
  response.code(201);
  return response;
}

async function getAllHistoriesHandler(req, h) {
  const data = await getAllHistoriesData();
  const response = h.response({
    status: "success",
    data: data,
  });
  response.code(200);
  return response;
}

module.exports = { predictModelHandler, getAllHistoriesHandler };
