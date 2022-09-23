export function convertToArray(refs) {
  let regArr = [];
  refs.forEach((r) => {
    let rD = r.data();
    rD.id = r.id;
    regArr.push(rD);
  });
  return regArr;
}


// NOT READY YET FNS ------------------------------------->
// FROM GREENSHADE

// really sophisticated readFn
// if input is string; treat it as id lowercased
// if it's an object; treat it as searchParameters(grnShObjOpts_ItemNode) to find the node
  // search parameters in search opts are prioritized in foll order
  // if search parameters has id key specified, use it lowercased and do simple lookup (always returns 1 obj)
  // if name is specified; for now lowercase it and use it as id
  // if other parameters are specified; do a lookup in nodecollection
// 
// tests
// let n;
// n = readGrnShObj_ItemNode("chairs");
// n = readGrnShObj_ItemNode({ id: "chairs" });
// n = readGrnShObj_ItemNode({ name: "Chairs" });
// n = readGrnShObj_ItemNode({ key: "value" });
// n = readGrnShObj_ItemNode();
function readGrnShObj_ItemNode(grnShObjIn_ItemNode) {
  let grnShObjOpts_ItemNode = {};
  if (typeof grnShObjIn_ItemNode === "string" || grnShObjIn_ItemNode instanceof String) {
    grnShObjOpts_ItemNode.id = grnShObjIn_ItemNode;
  }
  else if (typeof grnShObjIn_ItemNode === "object") {
    grnShObjOpts_ItemNode = grnShObjIn_ItemNode;
  }
  if (grnShObjOpts_ItemNode.id) grnShObjOpts_ItemNode.id = grnShObjOpts_ItemNode.id.toLowerCase();
  let grnShObj_ItemNode;
  let foundInColl = false;
  // console.log("grnShObjOpts_ItemNode", foundInColl, grnShObjOpts_ItemNode);
  if (!foundInColl && grnShObjOpts_ItemNode.id) {
    grnShObj_ItemNode = grnShMap_ItemNodes[grnShObjOpts_ItemNode.id];
    foundInColl = !!grnShObj_ItemNode;
  }
  else if (!foundInColl && grnShObjOpts_ItemNode.name) {
    grnShObjOpts_ItemNode.id = grnShObjOpts_ItemNode.name.toLowerCase();
    grnShObj_ItemNode = grnShMap_ItemNodes[grnShObjOpts_ItemNode.id];
    foundInColl = !!grnShObj_ItemNode;
  }
  else {
    console.error(`Trying to read with an unsupported input. You can specify the id as string or pass object like:\n { "id": "foo", "name": "bar" } `);
    return;
  }
  if (grnShObjOpts_ItemNode.id) grnShObjOpts_ItemNode.id = grnShObjOpts_ItemNode.id.toLowerCase();
  return grnShObj_ItemNode;
}

async function writeGrnSh_ItemNode(grnShObjOpts_ItemNode) {
  let grnShPreWriteObj_ItemNode = readGrnShObj_ItemNode(grnShObjOpts_ItemNode.id);
  if (!grnShPreWriteObj_ItemNode) grnShPreWriteObj_ItemNode = {};
  // let grnShPostWriteObjExpected_ItemNode = {};
  // keep updating, adding field left to right
  let grnShObjForWrite_ItemNode = {
    ...utils.cleanUndefined(failsafe_grShObj_ItemNode),
    ...utils.cleanUndefined(grnShPreWriteObj_ItemNode),
    ...utils.cleanUndefined(grnShObjOpts_ItemNode)
  };
  grnShObjForWrite_ItemNode.id = grnShObjForWrite_ItemNode.id.toLowerCase();
  grnShObjForWrite_ItemNode.ndId = grnShObjForWrite_ItemNode.id;
  // console.log("grnShObjForWrite_ItemNode", grnShObjForWrite_ItemNode);
  // write to db
  // let grnShPostWriteObjRecd_ItemNode = await readFromDb()
  // assert(grnShPostWriteObjExpected_ItemNode === grnShPostWriteObjRecd_ItemNode)
  // let grnShObj_ItemNode = grnShPostWriteObjRecd_ItemNode;
  let grnShObj_ItemNode = grnShObjForWrite_ItemNode;
  grnShMap_ItemNodes[grnShObjForWrite_ItemNode.id] = grnShObj_ItemNode;
  return grnShObj_ItemNode;
}

// <------------------------------------- NOT READY YET FNS