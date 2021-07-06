const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

const rapyd = require("./rapyd");

let app = admin.initializeApp();
let db = app.firestore();
let usersCollection = db.collection("users");
let hotLinksCollection = db.collection("hotLinks");
let dataPtsCollection = db.collection("dataPts");

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
  try {
    let campaignId = req.query.c || "";
    let assetId = req.query.a || "";
    let userId = req.query.u || "";
    let dpRef = dataPtsCollection.doc();
    dpRef.set({
      id: dpRef.id,
      campaignId,
      assetId,
      userId,
      createdOn: new Date(),
    });

    let id = req.query.uuid;
    let hotLinkRef = hotLinksCollection.doc(id);
    let hl = await hotLinkRef.get();
    let hlDoc = hl.data();
    if (hlDoc.isActive && !!hlDoc.redirectPath) {
      let curHtCt = hlDoc.hits || 0;
      hlDoc.hits = curHtCt + 1;
      hotLinkRef.update(hlDoc);
      return res.redirect(hlDoc.redirectPath);
    } else {
      return res.redirect("https://www.youtube.com/watch?v=iik25wqIuFo");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send();
  }
});

exports.wh_beneficiary_created = functions.https.onRequest(async (req, res) => {
  let benInfo = req.body.data;
  let vyrallId = benInfo.merchant_reference_id;
  let uRef = usersCollection.doc(vyrallId);
  let uDoc = await uRef.get();
  let u = uDoc.data();
  u.beneficiaryAcct = benInfo;
  uRef.update(u);
  return res.send(u);
});
