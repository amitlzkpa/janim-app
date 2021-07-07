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
    last_name: "",
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
  let res = await api.post(rapypApiProxyEndpt, postBody);
  u.walletId = res.data.id;
  let savedUser = await userSvc.saveUser();
  store.dispatch("saveUserProfile", savedUser);
}

export async function getRapydWallet(opts) {
  let { ewalletId } = opts || {};

  let postBody = {
    rapydQueryType: "get",
    rapydQueryPath: `/v1/user/${ewalletId}`,
    rapydQueryBody: "",
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  return res.data;
}

export async function connectRapydSenderAcct(opts) {
  let currencyCode = opts.currencyCode;
  let senderName = opts.name;
  let newSenderInfo = {
    country: "US",
    currency: currencyCode,
    entity_type: "company",
    name: senderName,
    identification_type: "identification_id",
    identification_value: "987654321",
    // Fields from 'sender_required_fields' in the response to 'Get Payout Method Type Required Fields'
    date_of_birth: "12/12/2000",
    address: "1 Second Street",
    city: "New York",
    state: "NY",
    postcode: "11001",
  };
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/payouts/sender`,
    rapydQueryBody: JSON.stringify(newSenderInfo),
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  return res.data;
}

export async function createRapydPayout(opts) {
  let newPayoutInfo = opts;
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/payouts`,
    rapydQueryBody: JSON.stringify(newPayoutInfo),
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  return res.data;
}

export async function createRapydTransfer(opts) {
  let u = await userSvc.currentUser();
  let newTransferInfo = {
    source_ewallet: "ewallet_532a14d92715f4238cdd75e04576b6ad",
    amount: 8,
    currency: "USD",
    destination_ewallet: "ewallet_5528d177012763345eec576ee9d11057",
  };
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/account/transfer`,
    rapydQueryBody: JSON.stringify(newTransferInfo),
  };
  console.log(newTransferInfo);
  let res = await api.post(rapypApiProxyEndpt, postBody);
  console.log(res.data);
}

export async function connectRapydBeneficiaryAcct(opts) {
  let newBeneficiaryPageInfo = opts;
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/hosted/disburse/beneficiary`,
    rapydQueryBody: JSON.stringify(newBeneficiaryPageInfo),
  };
  let res = await api.post(rapypApiProxyEndpt, postBody);
  return res.data;
}
