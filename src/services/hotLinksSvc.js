import * as fb from "@/firebase";
import * as utils from "@/utils";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

export async function updateOrAddHotLink(opts) {
  let newId = `${opts.campaignId}_${opts.assetId}`;
  opts.id = newId;
  let newHlRef = fb.hotLinksCollection.doc(newId);
  let hlDoc = await newHlRef.set(opts, { merge: true });
  return hlDoc;
}

export async function setHotLinkActiveStatus(opts) {
  let id = `${opts.campaignId}_${opts.assetId}`;
  let hotLinkRef = fb.hotLinksCollection.doc(id);
  let hlDoc = await hotLinkRef.set(
    {
      isActive: opts.isActive,
    },
    { merge: true }
  );
  return hlDoc;
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
