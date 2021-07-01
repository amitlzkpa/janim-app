import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

export async function createHotLink(opts) {
  let u = await userSvc.currentUser();
  await fb.hotLinksCollection.add({
    createdOn: new Date(),
    assetId: "foo",
    campaign: "bar",
    user: u.id,
  });
}
