import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

import store from "@/store";
import api from "@/api";

const rapypApiProxyEndpt = `/api/rapyd`;

export async function createRapydWallet(opts) {
  let u = await userSvc.currentUser();
  let newWalletInfo = {
    first_name: u.name,
    email: u.email,
    metadata: {
      merchant_defined: true,
    },
    type: "person",
  };
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/user`,
    rapydQueryBody: JSON.stringify(newWalletInfo),
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  u.walletId = res.data.id;
  let savedUser = await userSvc.saveUser();
  store.dispatch("saveUserProfile", savedUser);
}

export async function getRapydWallet(opts) {
  let u = await userSvc.currentUser();
  let { ewalletId } = opts || {};
  ewalletId = u.walletId;

  let postBody = {
    rapydQueryType: "get",
    rapydQueryPath: `/v1/user/${ewalletId}`,
    rapydQueryBody: "",
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  console.log(res.data);
}
