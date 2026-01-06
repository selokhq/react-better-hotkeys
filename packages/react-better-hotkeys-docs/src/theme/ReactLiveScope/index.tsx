import React from "react";
import ReactLiveScope from "@theme-original/ReactLiveScope";
import * as RH from "react-better-hotkeys";

const ExtendedScope = {
  ...ReactLiveScope,
  ...RH,
  React,
};

export default ExtendedScope;
