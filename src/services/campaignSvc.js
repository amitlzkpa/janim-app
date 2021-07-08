import * as fb from "@/firebase";
import * as utils from "@/utils";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";
import * as orgSvc from "@/services/orgSvc";
import * as hotlinksSvc from "@/services/hotLinksSvc";
import campaignSchema from "@/schemas/campaign";

async function hydrateCampaignInfo(campaignData, opts) {
  let {
    hydrateHls = true,
    hydrateOrg = true,
    hydrateJoins = true,
    hydrateCurrUser = true,
  } = opts || {};

  let campaignId = campaignData.id;

  if (hydrateHls) {
    // get hotlinks
    let hls = await hotlinksSvc.getCampaignHotLinks({ campaignId });
    campaignData.assets.forEach((a) => {
      a.hotLinkData = hls.find((h) => h.assetId === a.id);
    });
  }

  if (hydrateOrg) {
    campaignData.organization = await orgSvc.getFullOrg({
      orgId: campaignData.organization,
    });
  }

  if (hydrateJoins) {
    campaignData.campaignJoins = await dbMethods.getJoins({
      campaignId,
    });
  }

  if (hydrateCurrUser) {
    let usr = await userSvc.currentUser();
    campaignData.currUserHasJoined =
      campaignData.campaignJoins.filter((j) => j.user.id === usr.id).length > 0;
  }

  return campaignData;
}

export async function saveCampaign(campaignData) {
  if (!campaignData.campaign.id || campaignData.campaign.id === "new") {
    delete campaignData.campaign.id;
    let c = await fb.campaignsCollection.add(campaignData);
    campaignData.campaign.id = c.id;
  }
  campaignData.campaign.organization = campaignData.campaign.organization.id;
  // quick-hack start
  // convert to Date object for firebase save
  campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
    (d) => new Date(d)
  );

  // update hotlinks
  for (let asset of campaignData.campaign.assets) {
    let opts = {
      campaignId: campaignData.campaign.id,
      assetId: asset.id,
      isActive:
        asset.isActive.toString() === "true" &&
        (!asset.isHidden).toString() === "true",
      redirectPath: asset.targetUrl || "",
    };
    hotlinksSvc.updateOrAddHotLink(opts);
    delete asset.hotLinkData;
  }

  // remove the joins info from campaign
  delete campaignData.campaign.campaignJoins;
  delete campaignData.campaign.currUserHasJoined;
  // quick-hack end
  await fb.campaignsCollection
    .doc(campaignData.campaign.id)
    .update({ campaign: campaignData.campaign });

  return campaignData;
}

export async function getCampaign(campaignId) {
  let campaignData;

  let isNew = !campaignId;

  if (isNew) {
    campaignData = JSON.parse(JSON.stringify(campaignSchema));
  } else {
    campaignData = await dbMethods.getCampaign({ campaignId });
  }
  // quick-hack start
  // convert to pure js Date object from the firebase timestamp format
  campaignData.dateRange = campaignData.dateRange.map((d) => d.toDate());
  // quick-hack end

  if (!isNew) {
    campaignData = hydrateCampaignInfo(campaignData);
  }

  return campaignData;
}

export async function joinCampaign(opts) {
  let { campaignId } = opts;
  let u = await userSvc.currentUser();
  let cjRef = await fb.campaignJoinsCollection.add({
    user: u.id,
    campaign: campaignId,
    createdOn: new Date(),
  });
  return cjRef;
}

export async function unjoinCampaign(opts) {
  let { campaignId } = opts;
  let u = await userSvc.currentUser();
  let joinRefs = await fb.campaignJoinsCollection
    .where("campaign", "==", campaignId)
    .where("user", "==", u.id)
    .get();
  let joins = utils.convertToArray(joinRefs);
  for (let j of joins) {
    await fb.campaignJoinsCollection.doc(j.id).delete();
  }
  return joinRefs;
}

export async function getCampaignsOfOrg(opts) {
  let { orgId } = opts;
  let ccs = await dbMethods.getCampaigns({ orgId: orgId });
  let retArr = [];
  for (let cc of ccs) {
    cc.campaign = await hydrateCampaignInfo(cc.campaign, { hydrateOrg: false });
    retArr.push(cc);
  }
  return retArr;
}
