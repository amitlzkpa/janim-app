const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

const rapyd = require("./rapyd");

exports.test = functions.https.onRequest(async (req, res) => {
  functions.logger.info("Test success!", { structuredData: true });
  res.send("Hello from Vyrall!");
});

exports.rapyd = functions.https.onRequest(async (req, res) => {
  try {
    let rapyd_baseuri = `https://sandboxapi.rapyd.net`;
    let rapyd_access_key = functions.config().rapyd.access_key;
    let rapyd_secret_key = functions.config().rapyd.secret_key;
    let rapydQueryType = req.body.rapydQueryType;
    let rapydQueryPath = req.body.rapydQueryPath;
    let rapydQueryBody = rapyd.sanitizeBody(req.body.rapydQueryBody);

    let url = `${rapyd_baseuri}${rapydQueryPath}`;
    let salt = rapyd.getSalt();
    let timestamp = rapyd.getTimestamp();

    let signature = rapyd.calculateSignature(
      rapydQueryType,
      rapydQueryPath,
      salt,
      timestamp,
      rapyd_access_key,
      rapyd_secret_key,
      rapydQueryBody
    );

    let rapydConfig = {
      headers: {
        access_key: rapyd_access_key,
        "content-type": "application/json",
        salt: salt,
        signature: signature,
        timestamp: timestamp,
      },
    };

    let nRes;
    switch (rapydQueryType.toLowerCase()) {
      case "post": {
        nRes = await axios.post(url, rapydQueryBody, rapydConfig);
        break;
      }
      case "get": {
        nRes = await axios.get(url, rapydConfig);
        break;
      }
      default: {
        console.log(`Unsupported request type: ${rapydQueryType}`);
        break;
      }
    }
    return res.send(nRes.data.data);
  } catch (err) {
    console.error(err);
  }
});

exports.go = functions.https.onRequest(async (req, res) => {
  console.log("go");
  console.log(req.query.uuid);
  return res.send("go");
});

exports.wh_beneficiary_created = functions.https.onRequest(async (req, res) => {
  let firebaseConfig = {
    apiKey: "AIzaSyATv80DF3VOgJSB-COX4vLhsC4cESE2OJQ",
    authDomain: "vyrall.firebaseapp.com",
    projectId: "vyrall",
    storageBucket: "vyrall.appspot.com",
    messagingSenderId: "429094377009",
    appId: "1:429094377009:web:19364668bb00df5fb52710",
    measurementId: "G-SB0E11C90Y",
  };
  admin.initializeApp(firebaseConfig);
  let db = admin.firestore();

  console.log("wh_beneficiary_created");
  console.log(req.headers);
  console.log(req.body);

  let usersCollection = db.collection("users");
  let r = await usersCollection.doc("05Uercv9NwUXo7t2IdxiK9iuBww1").get();
  let u = r.data();
  console.log();
  console.log(u);
  console.log();
  return res.send(u);
});
