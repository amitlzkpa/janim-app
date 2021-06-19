import * as fb from "@/firebase";
import * as utils from "@/utils";
import _ from "lodash";

import organizationSchema from "@/schemas/organization";
import permissionSchema from "@/schemas/permission";

export async function createNewOrg(newOrgData) {
  let newOrgRef = await fb.organizationsCollection.doc();
  await newOrgRef.set({
    name: newOrgData.name,
    owner: fb.auth.currentUser.uid,
  });

  let newPermObjRef = await fb.permissionsCollection.doc();
  newPermObjRef.set({
    resource: `org_${newOrgRef.id}`,
    holder: fb.auth.currentUser.uid,
    holderType: "user",
    permissions: { admin: true },
  });

  let retData = await getFullOrg({ orgId: newOrgRef.id });

  return retData;
}

export async function addUserToOrg(opts) {
  let { email, orgId, permissions } = opts;
  let userObj = await db_getUser({ email: email });
  console.log(userObj);

  let newPermObjRef = await fb.permissionsCollection.doc();
  newPermObjRef.set({
    resource: `org_${orgId}`,
    holder: userObj.id,
    holderType: "user",
    permissions: permissions,
  });
  console.log(newPermObjRef);

  return true;
}

export async function getOrgsUserCanAccess(opts) {
  let { userId } = opts;
  let perms = await db_getPerms({ holderId: userId });
  let orgs = [];
  for (let p of perms) {
    let o = await getFullOrg({ orgId: p.resource.replace("org_", "") });
    orgs.push(o);
  }
  return orgs;
}

export async function getFullOrg(opts) {
  let { orgId } = opts;

  let org = await db_getOrg({ orgId: orgId });
  let owner = await db_getUser({ userId: org.owner });
  let perms = await db_getPerms({ rsrcId: `org_${orgId}` });

  org.owner = owner;
  org.perms = perms;
  return org;
}

// DB ACCESS

async function db_getPerms(opts) {
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
    p.holder = await db_getUser({ userId: p.holder });
  }
  return perms;
}

async function db_getOrg(opts) {
  let { orgId } = opts;
  let res = fb.organizationsCollection.doc(orgId);
  res = await res.get();
  res = res.data();
  res.id = orgId;
  return res;
}

async function db_getUser(opts) {
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
