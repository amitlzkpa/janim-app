import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import campaignSchema from "@/schemas/campaign";
import _ from "lodash";

export async function saveCampaign(campaignData) {
  if (!campaignData.campaign.id || campaignData.campaign.id === "new") {
    delete campaignData.campaign.id;
    let c = await fb.campaignsCollection.add(campaignData);
    campaignData.campaign.id = c.id;
  }
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
    let doc = await fb.campaignsCollection.doc(campaignId).get();
    campaignData = doc.data().campaign;
  } else {
    campaignData = JSON.parse(JSON.stringify(campaignSchema));
  }
  // quick-hack start
  // convert to pure js Date object from the firebase timestamp format
  campaignData.dateRange = campaignData.dateRange.map((d) => d.toDate());
  // quick-hack end

  return campaignData;
}
