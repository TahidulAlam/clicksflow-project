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
      <TabList className="flex gap-2 md:overflow-x-scroll lg:overflow-auto">
        {tabs.map(({ id, title }) => (
          <Tab
            key={id}
            className="focus:outline-none px-2 py-1 border-2 border-gray-300 rounded-lg cursor-pointer bg-white"
            selectedClassName="bg-[#1E3557] text-white rounded-lg"
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
