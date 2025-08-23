"use client";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
export interface TabPageItem {
  id: number;
  title: string;
  component: React.ReactNode;
}
interface TabbedPageProps {
  tabs: TabPageItem[];
  className?: string;
}
const TabbedPage: React.FC<TabbedPageProps> = ({ tabs, className = "" }) => {
  return (
    <Tabs className={` pr-4  ${className}`}>
      <TabList className="flex gap-2 md:overflow-x-scroll lg:overflow-auto text-gray-400 border-b border-gray-300">
        {tabs.map(({ id, title }) => (
          <Tab
            key={id}
            className="focus:outline-none  pr-2 py-1   cursor-pointer"
            selectedClassName="font-bold text-black border-b-2 border-gray-900"
          >
            <div className="flex items-center">
              <span className="whitespace-nowrap">{title}</span>
            </div>
          </Tab>
        ))}
      </TabList>

      {tabs.map(({ id, component }) => (
        <TabPanel key={id}>{component}</TabPanel>
      ))}
    </Tabs>
  );
};

export default TabbedPage;
