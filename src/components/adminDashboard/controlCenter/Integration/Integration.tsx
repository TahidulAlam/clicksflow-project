"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EmailIntegration from "./emailIntegration/EmailIntegration";
import FraudDetectionIntegration from "./fraudDetectionIntegration/FraudDetectionIntegration";
import ECommerceIntegration from "./eCommerceIntegration/ECommerceIntegration";

interface OfferTab {
  id: number;
  title: string;
  component: React.ReactNode;
}

const tabs: OfferTab[] = [
  { id: 1, title: "Email", component: <EmailIntegration /> },
  { id: 2, title: "Fraud Detection", component: <FraudDetectionIntegration /> },
  { id: 3, title: "E-commerce", component: <ECommerceIntegration /> },
];

const Integration: React.FC = () => {
  return (
    <>
      <Tabs className={"w-full bg-white p-5 rounded-lg border border-gray-300"}>
        <TabList className="flex gap-2 md:overflow-x-scroll lg:overflow-auto">
          {tabs.map(({ id, title }) => (
            <Tab
              key={id}
              className="focus:outline-none px-2 py-1 border-2 border-gray-300 rounded-lg cursor-pointer"
              selectedClassName="bg-[#1E3557] text-white rounded-lg"
            >
              <div className="flex items-center">
                {/* <span className="mr-1">{id}.</span> */}
                <span className="text-nowrap">{title}</span>
              </div>
            </Tab>
          ))}
        </TabList>

        {tabs.map(({ id, component }) => (
          <TabPanel key={id}>{component}</TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default Integration;
