const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictModel(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const prediction = model.predict(tensor).dataSync()[0] * 100;
    const result = prediction <= 50 ? "Non-cancer" : "Cancer";

    const suggestion = result === "Cancer" ? "Segera periksa ke dokter!" : "Penyakit kanker tidak terdeteksi.";

    return { result, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictModel;
