import * as fb from "@/firebase";
import * as dbMethods from "@/services/dbMethods";
import * as utils from "@/utils";
import _ from "lodash";

let _currentUser;

export async function currentUser() {
  if (!_currentUser) {
    _currentUser = await getUser({ userId: fb.auth.currentUser.uid });
  }
  return _currentUser;
}

export async function resetPassword(opts) {
  await fb.auth.sendPasswordResetEmail(opts.email);
}

export async function signIn(opts) {
  let { email, password } = opts;
  let fbObj = await fb.auth.signInWithEmailAndPassword(email, password);
  let fbUser = fbObj.user;
  let user = await getUser({ userId: fbUser.uid });
  return user;
}

export async function signOut(opts) {
  await fb.auth.signOut();
}

export async function createUser(opts) {
  let { name, email, password } = opts;
  let fbObj = await fb.auth.createUserWithEmailAndPassword(email, password);
  let fbUser = fbObj.user;
  let userRef = fb.usersCollection.doc(fbUser.uid);
  await userRef.set({
    name: name,
    email: email,
    id: fbUser.uid,
  });
  let user = await getUser({ userId: fbUser.uid });
  return user;
}

export async function getUser(opts) {
  let { userId } = opts;
  let user = await dbMethods.getUser({ userId });
  return user;
}
