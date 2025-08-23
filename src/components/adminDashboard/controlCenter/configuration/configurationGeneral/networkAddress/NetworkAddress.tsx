"use client";
import React from "react";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import NetworkBillingAddress from "./NetworkBillingAddress";
import NetworkDomainRegInfo from "./NetworkDomainRegInfo";

const accordionDataColumn1 = [
  {
    title: "Billing Address",
    content: <NetworkBillingAddress />,
    edit: true,
    linkUrl: "/admin/control/configuration/general/edit",
  },
];

const accordionDataColumn2 = [
  {
    title: "Domain Registration Information",
    content: <NetworkDomainRegInfo />,
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

const ConfigurationGeneral = () => {
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

export default ConfigurationGeneral;
