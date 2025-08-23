"use client";
import React from "react";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import PartnerSignUp from "./partnerSignUp/PartnerSignUp";
import PSUCustomInfo from "./psuCustomInfo/PSUCustomInfo";
import AdvertiserSignUp from "./advertiserSignUp/AdvertiserSignUp";
import ASUCustomInfo from "./asuCustomInfo/ASUCustomInfo";

const accordionDataColumn1 = [
  {
    title: "Partner Sign Up",
    content: <PartnerSignUp />,
    edit: true,
    linkUrl: "/admin/control/configuration/sign-up-form/partner/edit",
  },
  {
    title: "Partner Sign Up - Custom info",
    content: <PSUCustomInfo />,
    edit: true,
    linkUrl: "/admin/control/configuration/sign-up-form/partner/custom-info",
  },
];

const accordionDataColumn2 = [
  {
    title: "Advertiser Sign Up",
    content: <AdvertiserSignUp />,
    edit: true,
    linkUrl: "/admin/control/configuration/sign-up-form/advertiser/edit",
  },
  {
    title: "Advertiser Sign Up - Custom info",
    content: <ASUCustomInfo />,
    edit: true,
    linkUrl: "/admin/control/configuration/sign-up-form/advertiser/custom-info",
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

const SignUpSettings = () => {
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

export default SignUpSettings;
