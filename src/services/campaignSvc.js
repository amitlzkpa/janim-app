import * as fb from "@/firebase";
import * as utils from "@/utils";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";
import * as orgSvc from "@/services/orgSvc";
import campaignSchema from "@/schemas/campaign";
import _ from "lodash";

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
  // quick-hack end
  await fb.campaignsCollection
    .doc(campaignData.campaign.id)
    .update({ campaign: campaignData.campaign });

  return campaignData;
}

export async function getCampaign(campaignId) {
  let campaignData;

  if (campaignId) {
    campaignData = await dbMethods.getCampaign({ campaignId });
  } else {
    campaignData = JSON.parse(JSON.stringify(campaignSchema));
  }
  // quick-hack start
  // convert to pure js Date object from the firebase timestamp format
  campaignData.dateRange = campaignData.dateRange.map((d) => d.toDate());
  // quick-hack end

  if (campaignData.organization.orgId) {
    campaignData.organization = await orgSvc.getFullOrg({
      orgId: campaignData.organization,
    });
  }

  campaignData.campaignJoins = await dbMethods.getJoins({
    campaignId,
  });

  let usr = await userSvc.currentUser();
  campaignData.currUserHasJoined =
    campaignData.campaignJoins.filter((j) => j.user.id === usr.id).length > 0;

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
