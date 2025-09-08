"use client";

import RevenuePayoutForm from "./revenuePayoutForm/RevenuePayoutForm";
import TrackingControlForm from "./trackingAndControlForm/TrackingControlForm";
import AttributionForm from "./attributionForm/AttributionForm";
import TargetingForm from "./targetingForm/TargetingForm";
import FailTrafficForm from "./failTrafficForm/FailTrafficForm";
import CreativesForm from "./creativesForm/CreativesForm";
import EmailsForm from "./emailsForm/EmailsForm";
import GeneralAddOffer from "./addOfferForm/GeneralAddOffer";

import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "General", component: <GeneralAddOffer /> },
  { id: 2, title: "Revenue & Payout", component: <RevenuePayoutForm /> },
  { id: 3, title: "Tracking and Control", component: <TrackingControlForm /> },
  { id: 4, title: "Attribution", component: <AttributionForm /> },
  { id: 5, title: "Targeting", component: <TargetingForm /> },
  { id: 6, title: "Fail Traffic", component: <FailTrafficForm /> },
  { id: 7, title: "Creatives", component: <CreativesForm /> },
  { id: 8, title: "Emails", component: <EmailsForm /> },
];
const AddOfferPage = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default AddOfferPage;
