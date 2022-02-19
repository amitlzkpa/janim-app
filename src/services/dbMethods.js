import * as fb from "@/firebase";
import * as utils from "@/utils";
import _ from "lodash";

export async function getUser(opts) {
  let omitKeys = [];

  let { userId, email } = opts;
  let res;
  if (userId) {
    res = fb.usersCollection.doc(userId);
    res = await res.get();
    res = res.data();
  } else if (email) {
    res = fb.usersCollection.where("email", "==", email);
    res = await res.get();
    res = utils.convertToArray(res);
    res = res[0];
  }
  res = _.omit(res, omitKeys);
  return res;
}
