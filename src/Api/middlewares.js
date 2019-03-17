
import { AsyncStorage } from "react-native";
import Navigation from "../utils/Navigation";

const fetchToken = () =>
  new Promise((resolve, reject) => resolve(AsyncStorage.getItem("token")));

let token = null;
async function authMiddleware({ request, options }, next) {
  token = await fetchToken();
  if (!options.headers) {
    options.headers = {};
  }
  options.headers["authorization"] = token;
  next();
}

function requestMiddleware({ response }, next) {
  console.log("[RESPONSE]: ", response);
  if (response.status === 200) {
    if (response.parsed.data && response.parsed.data.autoSignin) {
      Navigation.navigate("Main");
    }
  }
  if (response.parsed.errors) {
    if(response.parsed.errors[0].path[0] === 'autoSignin'){
      AsyncStorage.removeItem("token");
      Navigation.navigate("Login");
    }
  }
  next();
}

export { authMiddleware, requestMiddleware };
