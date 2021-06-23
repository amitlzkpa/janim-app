import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";

export async function createPost(postData) {
  let u = await userSvc.currentUser();
  await fb.activityPostsCollection.add({
    createdOn: new Date(),
    modifiedOn: new Date(),
    content: postData.content,
    type: postData.type,
    campaign: postData.assocCampaignId,
    user: u.id,
  });
}

export async function getPosts(opts) {
  let posts = await dbMethods.getPosts(opts);
  return posts;
}
