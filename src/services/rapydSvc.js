import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

import api from "@/api";

let rapydEndpt = `https://sandboxapi.rapyd.net/v1`;
let rapydConfig = {
  headers: {
    rapyd_access_key: "DE32A63299B2DA25527F",
    rapyd_secret_key:
      "5107cd2907bb8b8f30227fc2fe0cd3353109e735efd5addf06bab44d1c77362a5944453d9ee9cfa6",
  },
};

export async function createRapydWallet(opts) {
  let postBody = {
    first_name: "John",
    last_name: "Doe",
    email: "",
    ewallet_reference_id: "John-Doe-02152020",
    metadata: {
      merchant_defined: true,
    },
    phone_number: "",
    type: "person",
    contact: {
      phone_number: "+14155551311",
      email: "johndoe@rapyd.net",
      first_name: "John",
      last_name: "Doe",
      mothers_name: "Jane Smith",
      contact_type: "personal",
      address: {
        name: "John Doe",
        line_1: "123 Main Street",
        line_2: "",
        line_3: "",
        city: "Anytown",
        state: "NY",
        country: "US",
        zip: "12345",
        phone_number: "+14155551111",
        metadata: {},
        canton: "",
        district: "",
      },
      identification_type: "PA",
      identification_number: "1234567890",
      date_of_birth: "11/22/2000",
      country: "US",
      nationality: "FR",
      metadata: {
        merchant_defined: true,
      },
    },
  };
  let url = `${rapydEndpt}/user`;
  console.log(url);
  let res = await api.post(url, postBody, rapydConfig);
  console.log(res);
}

export async function getRapydWallet(opts) {
  let ewallet_id = `ewallet_be16896ff549239d672e51541135b218`;
  let url = `${rapydEndpt}/user/${ewallet_id}`;
  console.log(url);
  let res = await api.get(url, rapydConfig);
  console.log(res);
}

export async function getVerificationDocuments(opts) {
  let { residenceCountry } = opts;
  let url = `${rapydEndpt}/identities/types?country=${residenceCountry}`;
  console.log(url);
  let res = await api.get(url, rapydConfig);
  console.log(res);
}
