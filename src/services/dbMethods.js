import * as fb from "@/firebase";
import * as utils from "@/utils";
import _ from "lodash";

export async function getPosts(opts) {
  let { campaignId } = opts;
  let postRefs = await fb.activityPostsCollection
    .where("campaign", "==", campaignId)
    .orderBy("createdOn", "desc")
    .get();
  let posts = utils.convertToArray(postRefs);
  for (let p of posts) {
    p.user = await getUser({ userId: p.user });
  }
  return posts;
}

export async function getPerms(opts) {
  let { rsrcId, holderId } = opts;

  let permissionRefs;

  if (holderId) {
    permissionRefs = await fb.permissionsCollection
      .where("holder", "==", holderId)
      .get();
  } else if (rsrcId) {
    permissionRefs = await fb.permissionsCollection
      .where("resource", "==", rsrcId)
      .get();
  }

  let perms = utils.convertToArray(permissionRefs);
  for (let p of perms) {
    p.holder = await getUser({ userId: p.holder });
  }
  return perms;
}

export async function getJoins(opts) {
  let { campaignId } = opts;
  let joinRefs = await fb.campaignJoinsCollection
    .where("campaign", "==", campaignId)
    .get();
  let joins = utils.convertToArray(joinRefs);
  for (let j of joins) {
    j.user = await getUser({ userId: j.user });
  }
  return joins;
}

export async function getCampaign(opts) {
  let { campaignId } = opts;
  let res = await fb.campaignsCollection.doc(campaignId).get();
  let cData = res.data().campaign;
  cData.id = campaignId;
  return cData;
}

export async function getCampaigns(opts) {
  let { orgId } = opts;
  let res = await fb.campaignsCollection
    .where("campaign.organization", "==", orgId)
    .get();
  let campaigns = utils.convertToArray(res);
  return campaigns;
}

export async function getOrg(opts) {
  let { orgId } = opts;
  let res = fb.organizationsCollection.doc(orgId);
  res = await res.get();
  res = res.data();
  res.id = orgId;
  return res;
}

export async function getUser(opts) {
  let omitKeys = [];

  let { userId, email } = opts;
  let res;
  if (userId) {
    res = fb.usersCollection.doc(userId);
    res = await res.get();
    res = res.data();
  } else if (email) {
    res = fb.usersCollection.where("email", "==", email);
    res = await res.get();
    res = utils.convertToArray(res);
    res = res[0];
  }
  res = _.omit(res, omitKeys);
  return res;
}
