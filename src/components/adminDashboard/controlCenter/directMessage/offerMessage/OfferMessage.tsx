import TabbedCard, { TabItem } from "@/components/shared/tabs/TabbedCard";
import React from "react";
import Offers from "./offerMessageTab/Offers";
import RecipintsMessage from "./offerMessageTab/RecipintsMessage";
import OfferContentMessage from "./offerMessageTab/OfferContentMessage";
import MessageOffer from "./offerMessageTab/MessageOffer";
import PreviewMessage from "./offerMessageTab/PreviewMessage";

const tabsCommponent: TabItem[] = [
  { id: 1, title: "Offers", component: <Offers /> },
  { id: 2, title: "Recipints", component: <RecipintsMessage /> },
  { id: 3, title: "Offer Content", component: <OfferContentMessage /> },
  { id: 4, title: "Message", component: <MessageOffer /> },
  { id: 4, title: "Preview", component: <PreviewMessage /> },
];
const OfferMessage = () => {
  return <TabbedCard tabs={tabsCommponent} />;
};

export default OfferMessage;
