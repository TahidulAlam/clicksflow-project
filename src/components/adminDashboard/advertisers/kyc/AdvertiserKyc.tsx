import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import AdvertiserKycPending from "./AdvertiserKycPending";
import AdvertiserKycVerified from "./AdvertiserKycVerified";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "Pending", component: <AdvertiserKycPending /> },
  { id: 2, title: "Verified", component: <AdvertiserKycVerified /> },
];
const AdvertiserKyc = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default AdvertiserKyc;
