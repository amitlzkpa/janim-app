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
    let rapyd_path = `/v1/data/countries`;
    rapyd_path = `/v1/identities/types?country=US`;

    let url = `${rapyd_baseuri}${rapyd_path}`;
    let salt = rapyd.getSalt();
    let timestamp = rapyd.getTimestamp();

    // httpMethod, url, salt, timestamp, accessKey, secretKey, body;
    let signature = rapyd.calculateSignature(
      "get",
      rapyd_path,
      salt,
      timestamp,
      rapyd_access_key,
      rapyd_secret_key,
      ""
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

    let nRes = await axios.get(url, rapydConfig);
    res.send(nRes.data.data);
  } catch (err) {
    console.error(err);
  }
});
