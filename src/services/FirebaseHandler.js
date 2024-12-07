const { Firestore } = require("@google-cloud/firestore");
require("dotenv").config();

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
});

async function storeData(id, data) {
  const predictCollection = db.collection("prediction");
  return predictCollection.doc(id).set(data);
}

async function getAllHistoriesData() {
  try {
    const snapshot = await db.collection("prediction").get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    const data = snapshot.docs.map((doc) => doc.data());
    const formattedData = data.map((item) => ({
      id: item.id,
      history: {
        result: item.result,
        createdAt: item.createdAt,
        suggestion: item.suggestion,
        id: item.id,
      },
    }));
    return formattedData;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

module.exports = { storeData, getAllHistoriesData };
