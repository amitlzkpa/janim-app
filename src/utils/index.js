export function convertToArray(refs) {
  let regArr = [];
  refs.forEach((r) => {
    let rD = r.data();
    rD.id = r.id;
    regArr.push(rD);
  });
  return regArr;
}
