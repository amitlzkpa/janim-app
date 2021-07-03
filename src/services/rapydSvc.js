import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

import api from "@/api";

const rapypApiProxyEndpt = `/api/rapyd`;

export async function createRapydWallet(opts) {
  let u = await userSvc.currentUser();
  let newWalletInfo = {
    first_name: u.name,
    email: u.email,
    ewallet_reference_id: u.id,
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
  console.log(postBody);
  let res = await api.post(rapypApiProxyEndpt, postBody);
  console.log(res.data);
  u.walletId = res.data.id;
  await userSvc.saveUser();
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
