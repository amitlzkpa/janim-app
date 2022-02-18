const functions = require("firebase-functions");
const admin = require("firebase-admin");

let app = admin.initializeApp();
let db = app.firestore();

exports.test = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Test success!", { structuredData: true });
  res.send("Hello from starter-firebase-emul-vuetify!");
});

exports.getStats = functions.https.onRequest(async (req, res) => {
  console.log("foo");
  return res.json({ foo: "bar" });
});

exports.go = functions.https.onRequest(async (req, res) => {
  try {
    return res.redirect("https://www.youtube.com/watch?v=iik25wqIuFo");
  } catch (err) {
    console.log(err);
    return res.status(404).send();
  }
});
