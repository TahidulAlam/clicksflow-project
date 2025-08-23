import TabbedPage, { TabPageItem } from "@/components/shared/tabs/TabbedPage";
import React from "react";
import ApplicationList from "./applicationList/ApplicationList";
import QuestionnairesList from "./questionnaires/QuestionnairesList";

const tabsCommponent: TabPageItem[] = [
  { id: 1, title: "Application", component: <ApplicationList /> },
  { id: 2, title: "Questionnaires", component: <QuestionnairesList /> },
];
const OfferApplication = () => {
  return <TabbedPage tabs={tabsCommponent} />;
};

export default OfferApplication;
