import React from "react";

import { createStore, useStore, subscribe } from "../store";
// import { fetchData } from "./api";




export const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1, fixes: false };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "fixes":
      return { ...state, fixes: !state.fixes };
    default:
      return state;
  }
};

const myStore = createStore("myStore", { count: 0 }, reducer);
const myStore2 = createStore("myStore2", { count: 0 }, reducer);
const myStore3 = createStore("myStore3", { count: 0 }, reducer);

myStore.subscribe(["increment", "decrement"], (action, state) => {
  console.log("subscrbied action with value", action, state);
});
myStore2.subscribe(["increment"], (action, state) => {
  console.log("subscrbied action with value 2", action, state);
});
myStore3.subscribe(["increment", "decrement", "fixes"], (action, state) => {
  console.log("subscrbied action with value 3", action, state);
});
// myStore.unsubscribe();
// myStore.subscribe(["decrement", "increment"], (action, state) => {
//   console.log("subscrbied action with value", action, state);
// });



// myStore.subscribe(["increment"], (action, state) => {
//   console.log("subscrbied action with value", action, state);
// });

export const counterActions = {
  async getData(params) {
    // const data = await fetch("https://www.google.com");
    // console.log("data", data);
    myStore.dispatch({ type: "increment" });
    myStore.dispatch({ type: "decrement" });
    myStore2.dispatch({ type: "decrement" });
    myStore3.dispatch({ type: "increment" });
    myStore2.dispatch({ type: "decrement" });
    myStore3.dispatch({ type: "fixes" });
  }
  /* additional actions here */
};

export default function initStore() {
  const [state] = useStore(myStore);
  return {
    state,
    actions:counterActions
  };
}
