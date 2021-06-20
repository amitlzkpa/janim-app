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
    createdOn: new Date(),
  });

  let newPermObjRef = await fb.permissionsCollection.doc();
  newPermObjRef.set({
    id: newPermObjRef.id,
    resource: `org_${newOrgRef.id}`,
    holder: fb.auth.currentUser.uid,
    holderType: "user",
    permissions: { admin: true },
  });

  let updatedOrg = await getFullOrg({ orgId: newOrgRef.id });
  return updatedOrg;
}

export async function addUserToOrg(opts) {
  let { email, orgId, permissions } = opts;
  let userObj = await db_getUser({ email: email });

  let newPermObjRef = fb.permissionsCollection.doc();
  await newPermObjRef.set({
    id: newPermObjRef.id,
    resource: `org_${orgId}`,
    holder: userObj.id,
    holderType: "user",
    permissions: permissions,
  });

  let updatedOrg = await getFullOrg({ orgId });
  return updatedOrg;
}

export async function remUserFmOrg(opts) {
  let { orgId, permObj } = opts;

  let newPermObjRef = await fb.permissionsCollection.doc(permObj.id);
  await newPermObjRef.delete();

  let updatedOrg = await getFullOrg({ orgId });
  return updatedOrg;
}

export async function updUserFmOrg(opts) {
  let { orgId, permObj } = opts;

  let newPermObjRef = await fb.permissionsCollection.doc(permObj.id);
  permObj.holder = permObj.holder.id;
  await newPermObjRef.set(permObj);

  let updatedOrg = await getFullOrg({ orgId });
  return updatedOrg;
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

  org.currUserPerm = perms.find((p) => p.holder.id === fb.auth.currentUser.uid);

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
