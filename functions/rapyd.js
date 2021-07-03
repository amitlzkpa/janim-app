const crypto = require("crypto-js");

exports.getSalt = function () {
  return crypto.lib.WordArray.random(12).toString();
};

exports.getTimestamp = function () {
  return (Math.floor(new Date().getTime() / 1000) - 10).toString();
};

exports.calculateSignature = function (
  httpMethod,
  url,
  salt,
  timestamp,
  accessKey,
  secretKey,
  body
) {
  let toSign = `${httpMethod}${url}${salt}${timestamp}${accessKey}${secretKey}${body}`;
  let signature = crypto.enc.Hex.stringify(
    crypto.HmacSHA256(toSign, secretKey)
  );
  return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(signature));
};
