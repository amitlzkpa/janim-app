const functions = require("firebase-functions");
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
