// "use client";
import React from "react";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import { FaPen } from "react-icons/fa";
import ConfigGenData from "./configGenData/ConfigGenData";
import Link from "next/link";
import ConfigGlobalSetting from "./configGlobalSetting/ConfigGlobalSetting";
import ConfigLoginLinks from "./configLoginLinks/ConfigLoginLinks";
import ConfigGenSecurity from "./configGenSecurity/ConfigGenSecurity";
import ConfigGlobalPostback from "./configGlobalPostback/ConfigGlobalPostback";

const accordionDataColumn1 = [
  {
    title: "General Settings",
    content: <ConfigGenData />,
    edit: true,
    linkUrl: "/admin/control/configuration/general/edit",
  },
  { title: "Security", content: <ConfigGenSecurity /> },
  { title: "Global Postback", content: <ConfigGlobalPostback /> },
];

const accordionDataColumn2 = [
  { title: "System Configuration", content: <ConfigGlobalSetting /> },
  { title: "Links", content: <ConfigLoginLinks /> },
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
