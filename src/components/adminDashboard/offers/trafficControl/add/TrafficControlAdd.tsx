import React from "react";
import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import TrafficCotrolGen from "./TrafficCotrolGen";
import TrafficControlCon from "./TrafficControlCon";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "General", component: <TrafficCotrolGen /> },
  { id: 2, title: "Control", component: <TrafficControlCon /> },
];
const TrafficControlAdd = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default TrafficControlAdd;
