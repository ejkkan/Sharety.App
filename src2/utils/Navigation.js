import { NavigationActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function goBack(routeName, params) {
  console.log("go back");
  _navigator.dispatch(
    NavigationActions.back({
      key: routeName
    })
  );
}

const dismissModal = modalRouteName => {
  return async (dispatch, getState) => {
    var modalKey = findRouteKey(getState(), modalRouteName);
    if (modalKey) {
      _navigator.dispatch(NavigationActions.back({ key: modalKey }));
    }
  };
};

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  dismissModal
};
