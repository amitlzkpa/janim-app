import * as fb from "@/firebase";
import * as fb_dbMethods from "@/services/fb_dbMethods";
import * as userSvc from "@/services/userSvc";

import store from "@/store";
import api from "@/api";

const fbFuncsProxyEndpt = `/api/test`;

export async function testFbFunc(opts) {
  let res = await api.get(fbFuncsProxyEndpt);
  return res.data;
}
