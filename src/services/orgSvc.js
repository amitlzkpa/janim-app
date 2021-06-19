import * as fb from "@/firebase";

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
    resource: newOrgRef.id,
    holder: fb.auth.currentUser.uid,
    permissions: { admin: true },
  });

  let retData = await getFullOrg({ orgId: newOrgRef.id });

  return retData;
}

export async function getFullOrg(opts) {
  let { orgId } = opts;

  let org = await db_getOrg({ orgId: orgId });
  let owner = await db_getUser({ userId: org.owner });
  let perms = await db_getPerms({ rsrcId: orgId });

  org.owner = owner;
  org.perms = perms;
  return org;
}

async function db_getPerms(opts) {
  let { rsrcId } = opts;

  let permissionRefs = await fb.permissionsCollection
    .where("resource", "==", rsrcId)
    .get();

  let perms = getArray(permissionRefs);
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
  let { userId } = opts;
  let res = fb.usersCollection.doc(userId);
  res = await res.get();
  return res.data();
}

function getArray(refs) {
  let regArr = [];
  refs.forEach((r) => {
    regArr.push(r.data());
  });
  return regArr;
}
