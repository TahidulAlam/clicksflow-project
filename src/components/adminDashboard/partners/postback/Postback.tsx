import React from "react";
import TabbedPage, { TabPageItem } from "@/components/shared/tabs/TabbedPage";
import Conversion from "./conversion/Conversion";
import Event from "./event/Event";
import Cpc from "./cpc/Cpc";

const tabsCommponent: TabPageItem[] = [
  { id: 1, title: "Conversion", component: <Conversion /> },
  { id: 2, title: "Event", component: <Event /> },
  { id: 3, title: "CPC", component: <Cpc /> },
];

const Postback = () => {
  return <TabbedPage tabs={tabsCommponent} />;
};

export default Postback;
