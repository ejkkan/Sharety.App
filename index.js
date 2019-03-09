/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import App from "./src";
import { name as appName } from "./app.json";
import bgMessaging from "./src/utils/bgMessaging";

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => bgMessaging
);
