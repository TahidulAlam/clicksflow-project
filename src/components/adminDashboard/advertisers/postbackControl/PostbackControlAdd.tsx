import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import PostbackControlGenarel from "./postbackControlForm/PostbackControlGenarel";
import PostbackControl from "./postbackControlForm/PostbackControl";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "Genarel", component: <PostbackControlGenarel /> },
  { id: 2, title: "Control", component: <PostbackControl /> },
];
const PostbackControlAdd = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default PostbackControlAdd;
