import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import PayoutRevenue from "./PayoutRevenue";
import Caps from "./Caps";
import ThrottleRates from "@/components/adminDashboard/offers/cutomOffer/ThrottleRates";
import LandingPage from "@/components/adminDashboard/offers/cutomOffer/LandingPage";
import Creative from "@/components/adminDashboard/offers/cutomOffer/Creative";
const tabsCommponent: TabItem[] = [
  { id: 1, title: "Payout & Revenue", component: <PayoutRevenue /> },
  { id: 2, title: "Caps", component: <Caps /> },
  { id: 3, title: "Throttle Rates", component: <ThrottleRates /> },
  { id: 4, title: "Landing Page", component: <LandingPage /> },
  { id: 5, title: "Creative", component: <Creative /> },
];
const CustomOffer = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default CustomOffer;
