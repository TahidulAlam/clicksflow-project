import React from "react";

import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import AdvertiserGenarel from "./AdvertiserGenarel";
import AdvertiserBilling from "./AdvertiserBilling";
import AdvertiserAddress from "./AdvertiserAddress";
import AdvertiserInformation from "./AdvertiserInformation";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "Genarel", component: <AdvertiserGenarel /> },
  { id: 2, title: "Address", component: <AdvertiserAddress /> },
  { id: 3, title: "Billing", component: <AdvertiserBilling /> },
  {
    id: 4,
    title: "Additional Information",
    component: <AdvertiserInformation />,
  },
];

const AdvertisersAdd = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default AdvertisersAdd;
