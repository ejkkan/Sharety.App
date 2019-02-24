import { AsyncStorage } from "react-native";
import { setContext } from "apollo-link-context";

const token = null;
const fetchTokenAsync = () =>
  new Promise((resolve, reject) => resolve(AsyncStorage.getItem("token")));

const authLink = setContext(operation =>
  fetchTokenAsync().then(token => {
    return {
      headers: {
        authorization: token || null,
        "user-agent": "dsfdsf"
      }
    };
  })
);

export { authLink };
