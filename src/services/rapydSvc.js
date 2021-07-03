import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

import api from "@/api";

const rapypApiProxyEndpt = `/api/rapyd`;

export async function createRapydWallet(opts) {
  console.log("Unimplmented method");
  // let postBody = {
  //   rapydQueryType: "post",
  //   rapydQueryPath: `/v1/user`,
  //   rapydQueryBody: JSON.stringify(newWalletInfo),
  // };
  // let res = await api.post(rapypApiProxyEndpt, postBody);
  // console.log(res.data);
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
