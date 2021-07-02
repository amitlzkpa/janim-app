const functions = require("firebase-functions");

exports.test = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Rapyd route test success!", { structuredData: true });
  res.send("Hello from Vyrall!");
});
