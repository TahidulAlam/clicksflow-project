// "use client";

// import React from "react";
// import Link from "next/link";
// import { BsThreeDotsVertical } from "react-icons/bs";

// import DataList from "@/components/shared/dataTable/DataList";
// import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";

// type EmailTemplateRow = {
//   id: number;
//   name: string;
//   subject: string;
//   action: string;
// };

// interface MenuItem {
//   label: string | React.ReactNode;
//   icon?: React.ReactNode;
//   onClick?: () => void;
//   labelHeader?: string;
//   children?: MenuItem[];
//   content?: React.ReactNode;
// }

// const labelData: EmailTemplateRow[] = [
//   {
//     id: 10,
//     name: "Advertiser account created",
//     subject: "Advertiser User account created successfully",
//     action: "",
//   },
//   {
//     id: 11,
//     name: "Advertiser Invoice Create",
//     subject: "Invoice created",
//     action: "",
//   },
//   {
//     id: 12,
//     name: "Advertiser Invoice Paid",
//     subject: "Payment received",
//     action: "",
//   },
//   {
//     id: 13,
//     name: "Advertiser KYC Approved",
//     subject: "KYC has been approved",
//     action: "",
//   },
//   {
//     id: 14,
//     name: "Advertiser KYC Rejected",
//     subject: "KYC has been rejected",
//     action: "",
//   },
//   {
//     id: 15,
//     name: "Advertiser Signup",
//     subject: "Your application has been received by {{site_name}}",
//     action: "",
//   },
//   {
//     id: 16,
//     name: "Advertiser Signup Approval",
//     subject: "You have been approved by {{site_name}}",
//     action: "",
//   },
//   {
//     id: 17,
//     name: "Advertiser Signup Reject",
//     subject: "Your application for {{site_name}}",
//     action: "",
//   },
//   {
//     id: 18,
//     name: "Affiliate offer application applied",
//     subject: "Offer application received",
//     action: "",
//   },
//   {
//     id: 19,
//     name: "Affiliate offer application approved",
//     subject: "Offer status changed",
//     action: "",
//   },
//   {
//     id: 20,
//     name: "Affiliate offer application rejected",
//     subject: "Affiliate Offer Rejected",
//     action: "",
//   },
//   { id: 21, name: "Default Template", subject: "{{subject}}", action: "" },
//   {
//     id: 22,
//     name: "Direct Message Template",
//     subject: "{{subject}}",
//     action: "",
//   },
//   {
//     id: 23,
//     name: "Email Change Confirmation",
//     subject: "Email Address Changed Confirmation",
//     action: "",
//   },
//   {
//     id: 24,
//     name: "Email Verification Advertiser",
//     subject: "Email verification for {{site_name}}",
//     action: "",
//   },
//   {
//     id: 25,
//     name: "Email Verification Partner",
//     subject: "Email verification for {{site_name}}",
//     action: "",
//   },
//   {
//     id: 26,
//     name: "Offer cap changed",
//     subject: "Offer cap changed due to scheduled actons",
//     action: "",
//   },
//   {
//     id: 27,
//     name: "Offer Creative Added",
//     subject: "Offer Creatives added",
//     action: "",
//   },
//   {
//     id: 28,
//     name: "Offer Creatives Paused",
//     subject: "Offer Creatives Paused",
//     action: "",
//   },
//   {
//     id: 29,
//     name: "Offer payout changed",
//     subject: "Offer payout changed due to scheduled actons",
//     action: "",
//   },
//   {
//     id: 30,
//     name: "Offer status Active to Pause",
//     subject: "Application status changed",
//     action: "",
//   },
//   {
//     id: 31,
//     name: "Offer status Pause to Active",
//     subject: "Application status changed",
//     action: "",
//   },
//   {
//     id: 32,
//     name: "Partner account created",
//     subject: "User account created successfully",
//     action: "",
//   },
//   {
//     id: 33,
//     name: "Partner invoice create",
//     subject: "Partner Invoice Create",
//     action: "",
//   },
//   { id: 34, name: "Partner Invoice Paid", subject: "Invoice paid", action: "" },
//   {
//     id: 35,
//     name: "Partner KYC Approved",
//     subject: "KYC has been approved",
//     action: "",
//   },
//   {
//     id: 36,
//     name: "Partner KYC Rejected",
//     subject: "KYC has been rejected",
//     action: "",
//   },
//   {
//     id: 37,
//     name: "Partner Signup",
//     subject: "Your application has been received by {{network_name}}",
//     action: "",
//   },
//   {
//     id: 38,
//     name: "Partner Signup Approval",
//     subject: "You have been approved by {{network_name}}",
//     action: "",
//   },
//   {
//     id: 39,
//     name: "Partner Signup Rejected",
//     subject: "Your application for {{network_name}}",
//     action: "",
//   },
//   {
//     id: 40,
//     name: "Password Reset Code",
//     subject: "Password Recovery",
//     action: "",
//   },
//   {
//     id: 41,
//     name: "Password Reset Confirmation",
//     subject: "You have reset your password",
//     action: "",
//   },
//   {
//     id: 42,
//     name: "scheduled action caps change",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 43,
//     name: "scheduled action creative activate",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 44,
//     name: "scheduled action creative pause",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 45,
//     name: "scheduled action offer activate",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 46,
//     name: "scheduled action offer pause",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 47,
//     name: "scheduled action offer group caps",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 48,
//     name: "scheduled action payout change",
//     subject: "Scheduled action created",
//     action: "",
//   },
//   {
//     id: 49,
//     name: "Send Password Reset Mail",
//     subject: "Password Reset Request",
//     action: "",
//   },
//   {
//     id: 50,
//     name: "Support Reply",
//     subject: "Reply Support Ticket",
//     action: "",
//   },
//   {
//     id: 51,
//     name: "Suspend partner",
//     subject: "Notification of Partner Account Suspension",
//     action: "",
//   },
//   {
//     id: 52,
//     name: "User activated advertiser partner",
//     subject: "Notice of Account Activation",
//     action: "",
//   },
//   {
//     id: 53,
//     name: "User suspend advertiser partner",
//     subject: "Notice of Account Suspension",
//     action: "",
//   },
//   {
//     id: 54,
//     name: "User Account Created By Admin",
//     subject: "User Account Created.",
//     action: "",
//   },
// ];

// const labelColumns = [
//   {
//     header: "Name",
//     width: "auto",
//     accessor: "name",
//     searchable: true,
//     headerClassName: "text-xs text-gray-600 uppercase",
//     cellClassName: "text-blue-700 font-medium",
//     cell: (row: EmailTemplateRow) => (
//       <Link
//         href={`/admin/control/configuration/notification/template/edit/${row.id}`}
//         className="hover:underline text-blue-700"
//       >
//         {row.name}
//       </Link>
//     ),
//   },
//   {
//     header: "Subject",
//     accessor: "subject",
//     searchable: true,
//     width: "auto",
//     headerClassName: "text-xs text-gray-600 uppercase",
//     cellClassName: "text-gray-800 text-start  whitespace-none",
//   },
//   {
//     header: "Action",
//     width: "auto",
//     accessor: "action",
//     headerClassName: "text-end",
//     headerButtonClassName: "flex justify-end",
//     cellClassName: "",
//     cell: (row: EmailTemplateRow) => {
//       const menuItems: MenuItem[] = [
//         {
//           label: (
//             <Link
//               href={`/admin/control/configuration/notification/template/edit/${row.id}`}
//               className="flex items-end gap-2"
//             >
//               <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
//               Edit
//             </Link>
//           ),
//         },
//       ];

//       return (
//         <div className="relative flex justify-end cursor-pointer">
//           <MultiLevelDropdown
//             label={<BsThreeDotsVertical />}
//             labelClass="text-sm font-bold border-none shadow-none cursor-pointer"
//             position="bottom-right"
//             menuClassName="z-[9999]"
//             menuItems={menuItems}
//           />
//         </div>
//       );
//     },
//   },
// ];

// const EmailTemplate = () => {
//   return (
//     <DataList
//       data={labelData}
//       columns={labelColumns}
//       showLinkButton={true}
//       addLinkLabel="Global Notification Template"
//       showSearchBar={false}
//       showColumnToggle={false}
//       showfilter={false}
//       pageSizeOptions={[10, 20, 50]}
//     />
//   );
// };

// export default EmailTemplate;

"use client";

import React from "react";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { emailTemplates } from "@/config/emailTemplatesData";

type EmailTemplateRow = {
  id: number;
  name: string;
  subject: string;
  action: string;
};

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const labelData: EmailTemplateRow[] = emailTemplates.map((t) => ({
  id: t.id,
  name: t.name,
  subject: t.subject,
  action: "",
}));

const labelColumns = [
  {
    header: "Name",
    width: "auto",
    accessor: "name",
    searchable: true,
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-blue-700 font-medium",
    cell: (row: EmailTemplateRow) => (
      <Link
        href={`/admin/control/configuration/notification/template/edit/${row.id}`}
        className="hover:underline text-blue-700"
      >
        {row.name}
      </Link>
    ),
  },
  {
    header: "Subject",
    accessor: "subject",
    searchable: true,
    width: "auto",
    headerClassName: "text-xs text-gray-600 uppercase",
    cellClassName: "text-gray-800 text-start  whitespace-none",
  },
  {
    header: "Action",
    width: "auto",
    accessor: "action",
    headerClassName: "text-end",
    headerButtonClassName: "flex justify-end",
    cellClassName: "",
    cell: (row: EmailTemplateRow) => {
      const menuItems: MenuItem[] = [
        {
          label: (
            <Link
              href={`/admin/control/configuration/notification/template/edit/${row.id}`}
              className="flex items-end gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              Edit
            </Link>
          ),
        },
      ];

      return (
        <div className="relative flex justify-end cursor-pointer">
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            labelClass="text-sm font-bold border-none shadow-none cursor-pointer"
            position="bottom-right"
            menuClassName="z-[9999]"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];

const EmailTemplate = () => {
  return (
    <DataList
      data={labelData}
      columns={labelColumns}
      showLinkButton={true}
      addLinkLabel="Global Notification Template"
      showSearchBar={false}
      showColumnToggle={false}
      showfilter={false}
      pageSizeOptions={[10, 20, 50]}
    />
  );
};

export default EmailTemplate;
