import * as fb from "@/firebase";
import * as utils from "@/utils";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

export async function updateOrAddHotLink(opts) {
  let newId = `${opts.campaignId}_${opts.assetId}`;
  opts.id = newId;
  let newHlDoc = fb.hotLinksCollection.doc(newId);
  let hl = await newHlDoc.set(opts, { merge: true });
  return hl;
}

export async function getHotLinkItem(opts) {
  let id = `${opts.campaignId}_${opts.assetId}`;
  let hotLinkRef = fb.hotLinksCollection.doc(id);
  let hl = await hotLinkRef.get();
  let hlDoc = hl.data();
  return hlDoc;
}

export async function getAssetHotLink(opts) {
  let hotLinkRefs = await fb.hotLinksCollection
    .where("assetId", "==", opts.assetId)
    .get();
  let hls = utils.convertToArray(hotLinkRefs);
  return hls[0];
}

export async function getCampaignHotLinks(opts) {
  let hotLinkRefs = await fb.hotLinksCollection
    .where("campaignId", "==", opts.campaignId)
    .get();
  let hls = utils.convertToArray(hotLinkRefs);
  return hls;
}
