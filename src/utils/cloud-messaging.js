import firebase, { RemoteMessage } from "react-native-firebase";

// let token = null;
const init = async onTokenRefresh => {
  //has enabled notifications
  console.log("init");
  const token = await getToken();
  console.log("token ", token);
  //register token to apollo
  onTokenRefresh(token);
  firebase.messaging().onTokenRefresh(onTokenRefresh);
  firebase.messaging().onMessage(message => {
    console.log("[FIREBASE MESSAGE]: ", message);
  });
};

const requestPermission = async () => {
  try {
    return await firebase.messaging().requestPermission();
    // User has authorised
  } catch (error) {
    // User has rejected permissions
  }
};

const checkPermissions = async () => {
  const enabled = await firebase.messaging().hasPermission();
  console.log("checkPermissions", enabled);
  if (enabled) {
    // user has permissions
  } else {
    // user doesn't have permission
  }
};

const getToken = async () => {
  // if (token) return token;
  try {
    return await firebase.messaging().getToken();
  } catch (error) {}
};

export default {
  init,
  getToken,
  checkPermissions,
  requestPermission
};
