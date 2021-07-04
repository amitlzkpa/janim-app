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

export async function createRapydPayout(opts) {
  let u = await userSvc.currentUser();
  let newPayoutInfo = {
    beneficiary: {
      payment_type: "regular",
      address: "1 Main Street",
      email: "annabanna@omail.com",
      city: "Anytown",
      country: "US",
      first_name: "Bibim",
      last_name: "Bop",
      state: "NY",
      postcode: "10101",
      aba: "573675777",
      account_number: "77711020345678",
      bank_name: "US General Bank",
      identification_type: "SSC",
      identification_value: "123456789",
      bic_swift: "BUINBGSF",
      ach_code: "123456789",
    },
    beneficiary_country: "US",
    beneficiary_currency: "USD",
    beneficiary_entity_type: "individual",
    confirm_automatically: true,
    payout_currency: "USD",
    payout_method_type: "us_general_bank",
    sender_amount: 36,
    sender: {
      name: "Sherlock Holmes",
      address: "123 First Street",
      city: "Anytown",
      state: "NY",
      date_of_birth: "22/02/1980",
      postcode: "12345",
      phonenumber: "621212938122",
      remitter_account_type: "Individual",
      source_of_income: "salary",
      identification_type: "License No",
      identification_value: "123456789",
      purpose_code: "ABCDEFGHI",
      account_number: "123456789",
      beneficiary_relationship: "client",
    },
    sender_country: "US",
    sender_currency: "USD",
    sender_entity_type: "individual",
  };
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/payouts`,
    rapydQueryBody: JSON.stringify(newPayoutInfo),
  };
  console.log(newPayoutInfo);
  let res = await api.post(rapypApiProxyEndpt, postBody);
  console.log(res.data);
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
  let u = await userSvc.currentUser();
  let newBeneficiaryPageInfo = {
    beneficiary_entity_type: "individual",
    sender_country: "US",
    sender_entity_type: "individual",
  };
  let postBody = {
    rapydQueryType: "post",
    rapydQueryPath: `/v1/hosted/disburse/beneficiary`,
    rapydQueryBody: JSON.stringify(newBeneficiaryPageInfo),
  };
  console.log(newBeneficiaryPageInfo);
  let res = await api.post(rapypApiProxyEndpt, postBody);
  console.log(res.data);
  window.open(res.data.redirect_url, "_blank").focus();
}
