import React from "react";

import { createStore, useStore, subscribe } from "../store";
// import { fetchData } from "./api";

subscribe('counterSubscriber', ["increment"], (action, state) => {
  console.log("subscrbied action with value", action, state);
});

export const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

const myStore = createStore("myStore", { count:0 }, reducer);


export const counterActions = {
  async getData(params) {
    const data = await fetch("https://www.google.com");
    console.log("data", data);
    myStore.dispatch({ type: "increment" });
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
