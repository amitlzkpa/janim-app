export function convertToArray(refs) {
  let regArr = [];
  refs.forEach((r) => {
    regArr.push(r.data());
  });
  return regArr;
}
