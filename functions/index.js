const functions = require("firebase-functions");
const axios = require("axios");

exports.test = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Test success!", { structuredData: true });
  res.send("Hello from Vyrall!");
});

exports.rapyd = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Rapyd query received", { structuredData: true });

  let nRes = await axios.get("https://google.com");
  functions.logger.info(nRes.data);

  res.send("Rapyd return");
});
