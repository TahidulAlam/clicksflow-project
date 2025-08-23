import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";

import React from "react";
import MyAccountGeneral from "./general/MyAccountGeneral";
import MyAccountLogins from "./logins/MyAccountLogins";
import MyAccountNotifications from "./notifications/MyAccountNotifications";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "General", component: <MyAccountGeneral /> },
  { id: 2, title: "Logins", component: <MyAccountLogins /> },
  { id: 3, title: "Notifications", component: <MyAccountNotifications /> },
];

const MyAccount = () => {
  return <TabbedCard showId={false} tabs={tabsCommponent} />;
};

export default MyAccount;
