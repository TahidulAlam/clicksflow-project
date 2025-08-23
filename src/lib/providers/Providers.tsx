"use client";

import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/store";

interface ProvidersProps {
  children: React.ReactNode;
}

const store = makeStore();

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
