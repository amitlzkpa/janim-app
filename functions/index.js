const functions = require("firebase-functions");

exports.test = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Test success!", { structuredData: true });
  res.send("Hello from Vyrall!");
});

exports.rapyd = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Rapyd query received", { structuredData: true });
  res.json({ rapyd: "foo" });
});
