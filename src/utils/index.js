import moment from "moment";

export function convertToArray(refs) {
  let regArr = [];
  refs.forEach((r) => {
    let rD = r.data();
    rD.id = r.id;
    regArr.push(rD);
  });
  return regArr;
}

export function processToTimestamp(dateObject) {
  let ret = dateObject ? moment(dateObject) : null;
  return ret ? ret.format("MMM Do YYYY") : "-";
}

export function arrayUnion(arrA, arrB, fn) {
  arrA = arrA || [];
  arrB = arrB || [];
  let ret = [...new Set([...arrA, ...arrB])].filter((i) => !!i);
  return ret;
}
