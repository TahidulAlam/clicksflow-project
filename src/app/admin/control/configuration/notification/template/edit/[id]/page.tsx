// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import EmailTemplateEdit from "@/components/adminDashboard/controlCenter/configuration/emailTemplate/EmailTemplateEdit";
// import { getTemplateById } from "@/config/emailTemplatesData";

// export default function Page() {
//   const { id } = useParams() as { id: string };
// // const { id } = useParams() as { id: string };
//   const template = getTemplateById(id);

//   if (!template) return <p>Template not found.</p>;

//   return (
//     <div>
//       <h1 className="text-lg font-bold">Edit Template</h1>
//       <p>Currently editing template ID: {id}</p>
//       <EmailTemplateEdit templateId={id} initialData={template} />
//     </div>
//   );
// }

"use client";

import React from "react";
import { useParams } from "next/navigation";
import EmailTemplateEdit from "@/components/adminDashboard/controlCenter/configuration/emailTemplate/EmailTemplateEdit";
import { getTemplateById } from "@/config/emailTemplatesData";

export interface ShortCodeGroup {
  title: string;
  codes: {
    code: string;
    description: string;
  }[];
}

export interface EmailTemplate {
  id: string;
  subject: string;
  body: string;
  isStatus?: boolean;
  shortGroupData?: ShortCodeGroup[];
}

export interface EmailTemplateFormData {
  subject: string;
  body: string;
  isStatus?: boolean;
  shortcodeGroups?: ShortCodeGroup[];
}

export default function Page() {
  const { id } = useParams() as { id: string };

  const template = getTemplateById(id) as EmailTemplate | undefined;

  if (!template) return <p>Template not found.{id}</p>;

  const initialData: EmailTemplateFormData = {
    subject: template.subject || "",
    body: template.body || "",
    isStatus: template.isStatus || false,
    shortcodeGroups: template.shortGroupData || [],
  };

  return (
    <div>
      {/* <h1 className="text-lg font-bold">Edit Template</h1>
      <p>Currently editing template ID: {id}</p> */}

      <EmailTemplateEdit templateId={id} initialData={initialData} />
    </div>
  );
}
