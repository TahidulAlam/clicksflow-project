"use client";

import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UICustomizationGeneral from "./UICustomizationGeneral";
import UICustomizationColor from "./UICustomizationColor";

interface UICustomizationTab {
  id: number;
  title: string;
  component: React.ReactNode;
}

const UICustomizationTabs: UICustomizationTab[] = [
  { id: 1, title: "General", component: <UICustomizationGeneral /> },
  { id: 2, title: "Color", component: <UICustomizationColor /> },
];

const UICustomization: React.FC = () => {
  return (
    <Tabs className="w-full bg-white p-5 ">
      {/* Tab List */}
      <TabList className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
        {UICustomizationTabs.map(({ id, title }) => (
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
      {UICustomizationTabs.map(({ id, component }) => (
        <TabPanel key={id} className="mt-4">
          {component}
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default UICustomization;
