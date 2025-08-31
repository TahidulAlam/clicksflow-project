"use client";

import React from "react";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import BoxDataGrid from "@/components/shared/boxAccordion/BoxDataGrid";

const generalSettings = [
  { label: "Display Logo in Partner Invoice", value: "ON" },
  { label: "Display Logo in Advertiser Invoice", value: "OFF" },
  { label: "Display Partner Payment Info", value: "ON" },
  { label: "Display Advertiser Payment Info", value: "ON" },
  { label: "Display Partner Tax ID on Partner Invoice", value: "ON" },
  { label: "Display Advertiser Tax ID on Advertiser Invoice", value: "ON" },
];
const defaultPartnerSettings = [
  { label: "Default Settings Enabled", value: "ON" },
  { label: "Auto Create Invoice", value: "ON" },
  { label: "Auto Invoice Start Date", value: "2023-12-01" },
  { label: "Invoice Generation Days Delay", value: "1 Day" },
  { label: "Default Payment Terms", value: "Net 15" },
];
const defaultAdvertiserSettings = [
  { label: "Default Settings Enabled", value: "ON" },
  { label: "Auto Create Invoice", value: "OFF" },
  { label: "Auto Invoice Start Date", value: "N/A" },
  { label: "Invoice Generation Days Delay", value: "N/A" },
  { label: "Default Payment Terms", value: "None" },
];

const accordionDataColumn1 = [
  {
    title: "General",
    content: <BoxDataGrid data={generalSettings} columns={2} gap={4} />,
    edit: true,
    linkUrl: "/admin/control/configuration/billing/edit",
  },
];

const accordionDataColumn2 = [
  {
    title: "Partner Billing Settings",
    content: <BoxDataGrid data={defaultPartnerSettings} columns={2} gap={4} />,
    edit: true,
    linkUrl: "/admin/control/configuration/general/edit",
  },
  {
    title: "Advertiser Billing Settings",
    content: (
      <BoxDataGrid data={defaultAdvertiserSettings} columns={2} gap={4} />
    ),
    edit: true,
    linkUrl: "/admin/control/configuration/general/edit",
  },
];

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  edit?: boolean;
  linkUrl?: string;
}

interface AccordionSectionProps {
  items: AccordionItem[];
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ items }) => (
  <div className="grid grid-cols-1 gap-5">
    {items.map(({ title, content, edit, linkUrl }, index) => (
      <BoxAccordion key={index}>
        <BoxHeader
          collapsible={true}
          className="bg-blue-100 flex justify-between items-center"
        >
          <h2 className="text-sm font-bold py-1">{title}</h2>
          {edit && linkUrl && (
            <Link
              href={linkUrl}
              className="text-blue-950 cursor-pointer flex items-center gap-2 text-sm"
            >
              <FaPen />
              <span>Edit</span>
            </Link>
          )}
        </BoxHeader>
        <BoxContent>
          <div className="p-2">{content}</div>
        </BoxContent>
      </BoxAccordion>
    ))}
  </div>
);

const BillingSettings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <AccordionSection items={accordionDataColumn1} />
      </div>
      <div>
        <AccordionSection items={accordionDataColumn2} />
      </div>
    </div>
  );
};

export default BillingSettings;
