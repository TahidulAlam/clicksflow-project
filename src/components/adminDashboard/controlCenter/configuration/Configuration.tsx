"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ConfigurationGeneral from "./configurationGeneral/ConfigurationGeneral";
import ReferralSettings from "./referralSettings/ReferralSettings";
import NetworkAddress from "./configurationGeneral/networkAddress/NetworkAddress";
import AllDomainList from "./allDomainList/AllDomainList";
import PartnerPortalSetting from "./partnerPortalSetting/PartnerPortalSetting";
import AdvertiserPortal from "./advertiserPortal/AdvertiserPortal";
import UICustomization from "./uICustomization/UICustomization";
import AdvertiserKycSettings from "./advertiserKycSettings/AdvertiserKycSettings";
import PartnerKycSettings from "./partnerKycSettings/PartnerKycSettings";
import SignUpSettings from "./signUp/SignUpSettings";
import SeoSettings from "./seoSettings/SeoSettings";
import EmailTemplate from "./emailTemplate/EmailTemplate";

interface ConfigTab {
  id: number;
  title: string;
  component: React.ReactNode;
}

const configTabs: ConfigTab[] = [
  { id: 1, title: "General", component: <ConfigurationGeneral /> },
  { id: 2, title: "Referral", component: <ReferralSettings /> },
  { id: 3, title: "Address", component: <NetworkAddress /> },
  { id: 4, title: "Domain", component: <AllDomainList /> },
  {
    id: 5,
    title: "Partner Portal",
    component: <PartnerPortalSetting />,
  },
  {
    id: 6,
    title: "Advertiser Portal",
    component: <AdvertiserPortal />,
  },
  {
    id: 7,
    title: "UI Customization",
    component: <UICustomization />,
  },
  {
    id: 8,
    title: "Advertiser KYC",
    component: <AdvertiserKycSettings />,
  },
  { id: 9, title: "Partner KYC", component: <PartnerKycSettings /> },
  { id: 10, title: "Sign Up", component: <SignUpSettings /> },
  { id: 11, title: "SEO", component: <SeoSettings /> },
  {
    id: 12,
    title: "Email Template",
    component: <EmailTemplate />,
  },
  {
    id: 13,
    title: "Default Notification",
    component: <div>Default Notification Settings</div>,
  },
  { id: 14, title: "Billing", component: <div>Billing Settings</div> },
  { id: 15, title: "API", component: <div>API Settings</div> },
];

const Configuration: React.FC = () => {
  return (
    <Tabs className="w-full bg-white p-5 rounded-lg border border-gray-300">
      {/* Tab List */}
      <TabList className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
        {configTabs.map(({ id, title }) => (
          <Tab
            key={id}
            className="focus:outline-none px-3 py-1 text-sm border-2 border-gray-300 rounded-lg cursor-pointer transition-colors whitespace-nowrap text-gray-500"
            selectedClassName="bg-[#1E3557] text-white border-[#1E3557]"
          >
            {title}
          </Tab>
        ))}
      </TabList>

      {/* Tab Panels */}
      {configTabs.map(({ id, component }) => (
        <TabPanel key={id} className="mt-4">
          {component}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default Configuration;
