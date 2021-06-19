import * as fb from "@/firebase";

import organizationSchema from "@/schemas/organization";
import permissionSchema from "@/schemas/permission";

export async function createNewOrg(newOrgData) {
  let res;

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

  res = await newOrgRef.get();
  let newOrg = await res.data();

  res = await newPermObjRef.get();
  let newOrgPerm = await res.data();

  let retData = {
    newOrg,
    newOrgPerm,
  };

  return retData;
}
