import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as userSvc from "@/services/userSvc";
import _ from "lodash";

export async function createNewOrg(newOrgData) {
  let u = await userSvc.currentUser();

  let newOrgRef = await fb.organizationsCollection.doc();
  await newOrgRef.set({
    name: newOrgData.name,
    id: newOrgRef.id,
    owner: u.id,
    createdOn: new Date(),
  });

  let newPermObjRef = await fb.permissionsCollection.doc();
  newPermObjRef.set({
    id: newPermObjRef.id,
    resource: `org_${newOrgRef.id}`,
    holder: u.id,
    holderType: "user",
    permissions: { admin: true },
  });

  let updatedOrg = await getFullOrg({ orgId: newOrgRef.id });
  return updatedOrg;
}

export async function addUserToOrg(opts) {
  let { email, orgId, permissions } = opts;
  let userObj = await dbMethods.getUser({ email: email });

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
  let perms = await dbMethods.getPerms({ holderId: userId });
  let orgs = [];
  for (let p of perms) {
    let o = await getFullOrg({ orgId: p.resource.replace("org_", "") });
    orgs.push(o);
  }
  return orgs;
}

export async function getFullOrg(opts) {
  let { orgId } = opts;

  let u = await userSvc.currentUser();

  let org = await dbMethods.getOrg({ orgId: orgId });
  let owner = await dbMethods.getUser({ userId: org.owner });
  let perms = await dbMethods.getPerms({ rsrcId: `org_${orgId}` });

  org.currUserPerm = perms.find((p) => p.holder.id === u.id);

  org.owner = owner;
  org.perms = perms;
  return org;
}
