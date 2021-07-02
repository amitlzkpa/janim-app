import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

export async function createRapydWallet(opts) {
  // let url = `https://sandboxapi.rapyd.net/v1/identities/types?country=US`;
  // console.log(url);

  let rapydEndpt = `https://sandboxapi.rapyd.net/v1`;
  let ewallet_id = `ewallet_be16896ff549239d672e51541135b218`;
  let url = `${rapydEndpt}/user/${ewallet_id}`;
  console.log(url);
}
