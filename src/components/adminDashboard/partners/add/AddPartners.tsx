import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import GenPartners from "./GenPartners";
import AddressPartners from "./AddressPartners";
import BillingPartners from "./BillingPartners";
import AddUserPartners from "./AddUserPartners";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "General", component: <GenPartners /> },
  { id: 2, title: "Address", component: <AddressPartners /> },
  { id: 3, title: "Billing", component: <BillingPartners /> },
  { id: 4, title: "User", component: <AddUserPartners /> },
];
const AddPartners = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default AddPartners;
