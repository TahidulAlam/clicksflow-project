"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import RevenuePayoutForm from "./revenuePayoutForm/RevenuePayoutForm";
// import GenarelAddForm from "./addOfferForm/GenarelAddForm";
import TrackingControlForm from "./trackingAndControlForm/TrackingControlForm";
import AttributionForm from "./attributionForm/AttributionForm";
import TargetingForm from "./targetingForm/TargetingForm";
import FailTrafficForm from "./failTrafficForm/FailTrafficForm";
import CreativesForm from "./creativesForm/CreativesForm";
import EmailsForm from "./emailsForm/EmailsForm";
import GeneralAddOffer from "./addOfferForm/GeneralAddOffer";

interface OfferTab {
  id: number;
  title: string;
  component: React.ReactNode;
}

const tabs: OfferTab[] = [
  { id: 1, title: "General", component: <GeneralAddOffer /> },
  { id: 2, title: "Revenue & Payout", component: <RevenuePayoutForm /> },
  { id: 3, title: "Tracking and Control", component: <TrackingControlForm /> },
  { id: 4, title: "Attribution", component: <AttributionForm /> },
  { id: 5, title: "Targeting", component: <TargetingForm /> },
  { id: 6, title: "Fail Traffic", component: <FailTrafficForm /> },
  { id: 7, title: "Creatives", component: <CreativesForm /> },
  { id: 8, title: "Emails", component: <EmailsForm /> },
];

const AddOfferPage: React.FC = () => {
  return (
    <div>
      <Tabs className={"w-full bg-white p-5 rounded-lg border border-gray-300"}>
        <TabList className="flex gap-2 py-4 md:overflow-x-scroll lg:overflow-auto">
          {tabs.map(({ id, title }) => (
            <Tab
              key={id}
              className="focus:outline-none px-2 py-1 border-2 border-gray-300 rounded-lg cursor-pointer"
              selectedClassName="bg-[#1E3557] text-white rounded-lg"
            >
              <div className="flex items-center">
                <span className="mr-1">{id}.</span>
                <span className="text-nowrap">{title}</span>
              </div>
            </Tab>
          ))}
        </TabList>

        {tabs.map(({ id, component }) => (
          <TabPanel key={id}>{component}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default AddOfferPage;
