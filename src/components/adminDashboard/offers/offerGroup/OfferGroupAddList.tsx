"use client";

import React from "react";
import GenaralOfferGroup from "./genaralOfferGroup/GenaralOfferGroup";
import CapControl from "./capControl/CapControl";
import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "General", component: <GenaralOfferGroup /> },
  { id: 2, title: "Revenue & Payout", component: <CapControl /> },
];

const OfferGroupAddList = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default OfferGroupAddList;
