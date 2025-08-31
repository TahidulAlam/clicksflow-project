"use client";

import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export interface TabItem {
  id: number;
  title: string;
  showId?: boolean;
  component: React.ReactNode;
}

interface TabbedCardProps {
  tabs: TabItem[];
  className?: string;
  showId?: boolean;
}

const TabbedCard: React.FC<TabbedCardProps> = ({
  tabs,
  className = "",
  showId = true,
}) => {
  return (
    <Tabs
      className={`bg-white p-4 border border-gray-300 rounded-xl ${className}`}
    >
      <TabList className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
        {tabs.map(({ id, title }) => (
          <Tab
            key={id}
            className="focus:outline-none px-3 py-1 text-sm border-2 border-gray-300 rounded-lg cursor-pointer transition-colors whitespace-nowrap text-gray-500"
            selectedClassName="bg-[#1E3557] text-white border-[#1E3557]"
          >
            <div className="flex items-center">
              {showId && <span className="mr-1">{id}.</span>}
              <span className="whitespace-nowrap">{title}</span>
            </div>
          </Tab>
        ))}
      </TabList>

      {tabs.map(({ id, component }) => (
        <TabPanel key={id}>
          <div className="mt-4">{component}</div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default TabbedCard;
