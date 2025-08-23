"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface PostbackTabProps {
  data: string;
}

const PostbackTab: React.FC<PostbackTabProps> = ({ data }) => {
  const [textToCopy, setTextToCopy] = useState(data);
  const [copySuccess, setCopySuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextToCopy(e.target.value);
    setCopySuccess("");
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-2">
        <input
          type="text"
          value={textToCopy}
          onChange={handleInputChange}
          readOnly
          className="flex-1 text-xs p-1 outline-none"
        />
        <button
          type="button"
          onClick={handleCopyClick}
          className="text-gray-600 text-lg"
          title="Copy"
        >
          <FaRegCopy />
        </button>
      </div>
      {copySuccess && (
        <p className="text-green-600 text-xs font-medium">{copySuccess}</p>
      )}
    </div>
  );
};

// Tab list definition
const tabs: { id: number; title: string; component: React.ReactNode }[] = [
  {
    id: 1,
    title: "Postback",
    component: (
      <PostbackTab data="https://ryc2trk.com/c/?transaction_id=TRANSACTION_ID" />
    ),
  },
  {
    id: 2,
    title: "HTML Pixel",
    component: (
      <PostbackTab
        data={`<img src="https://ryc2trk.com/c/?transaction_id=TRANSACTION_ID" width="1px" height="1px" />`}
      />
    ),
  },
  {
    id: 3,
    title: "JavaScript",
    component: (
      <PostbackTab
        data={`(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://ryc2trk.com/c/?transaction_id=TRANSACTION_ID', true);
  xhr.send();
})()`}
      />
    ),
  },
];

const ConfigGlobalPostback: React.FC = () => {
  return (
    <Tabs className="w-full bg-white p-5 rounded-lg shadow">
      <TabList className="flex gap-2 overflow-x-auto border-b border-gray-200 pb-2 mb-4">
        {tabs.map(({ id, title }) => (
          <Tab
            key={id}
            className="px-3 py-1.5 border border-gray-300 text-sm rounded-md cursor-pointer"
            selectedClassName="bg-[#1E3557] text-white"
          >
            {title}
          </Tab>
        ))}
      </TabList>

      {tabs.map(({ id, component }) => (
        <TabPanel key={id}>{component}</TabPanel>
      ))}
    </Tabs>
  );
};

export default ConfigGlobalPostback;
