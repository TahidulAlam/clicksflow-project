import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import RecipintsGenMessage from "./generalMessage/RecipintsGenMessage";
import GenMessage from "./generalMessage/GenMessage";
import PreviewGenMessage from "./generalMessage/PreviewGenMessage";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "Recipints", component: <RecipintsGenMessage /> },
  { id: 2, title: "Message", component: <GenMessage /> },
  { id: 3, title: "Preview", component: <PreviewGenMessage /> },
];
const GeneralMessage = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default GeneralMessage;
