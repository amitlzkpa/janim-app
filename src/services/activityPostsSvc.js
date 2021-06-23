import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";
import _ from "lodash";

export async function updatePostsAuthor(user) {
  let postDocs = await fb.activityPostsCollection
    .where("userId", "==", user.id)
    .get();
  postDocs.forEach((doc) => {
    fb.activityPostsCollection.doc(doc.id).update({
      userName: user.name,
    });
  });
}

export async function createPost(postData) {
  let u = await userSvc.currentUser();
  await fb.activityPostsCollection.add({
    createdOn: new Date(),
    modifiedOn: new Date(),
    content: postData.content,
    type: postData.type,
    assocCampaignId: postData.assocCampaignId,
    userId: u.id,
    userName: u.name,
  });
}

export async function getPosts(opts) {
  let posts = await dbMethods.getPosts(opts);
  return posts;
}
