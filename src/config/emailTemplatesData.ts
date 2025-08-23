// src/lib/emailTemplates.ts
// export type EmailTemplate = {
//   id: number;
//   name: string;
//   subject: string;
//   body?: string;
//   isStatus?: boolean;
// };

// export const emailTemplates: EmailTemplate[] = [
//   {
//     id: 10,
//     name: "Advertiser account created",
//     subject: "Advertiser User account created successfully",
//     body: "<p>Hello, your advertiser account has been created successfully.</p>",
//     isStatus: true,
//   },
//   {
//     id: 11,
//     name: "Advertiser Invoice Create",
//     subject: "Invoice created",
//     body: "<p>Your invoice is ready to download.</p>",
//     isStatus: true,
//   },
//   {
//     id: 12,
//     name: "Advertiser Invoice Paid",
//     subject: "Payment received",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 13,
//     name: "Advertiser KYC Approved",
//     subject: "KYC has been approved",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 14,
//     name: "Advertiser KYC Rejected",
//     subject: "KYC has been rejected",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 15,
//     name: "Advertiser Signup",
//     subject: "Your application has been received by {{site_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 16,
//     name: "Advertiser Signup Approval",
//     subject: "You have been approved by {{site_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 17,
//     name: "Advertiser Signup Reject",
//     subject: "Your application for {{site_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 18,
//     name: "Affiliate offer application applied",
//     subject: "Offer application received",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 19,
//     name: "Affiliate offer application approved",
//     subject: "Offer status changed",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 20,
//     name: "Affiliate offer application rejected",
//     subject: "Affiliate Offer Rejected",
//     body:"",
//     isStatus: true,
//   },
//   { id: 21, name: "Default Template", subject: "{{subject}}",  body:"",
//     isStatus: true, },
//   {
//     id: 22,
//     name: "Direct Message Template",
//     subject: "{{subject}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 23,
//     name: "Email Change Confirmation",
//     subject: "Email Address Changed Confirmation",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 24,
//     name: "Email Verification Advertiser",
//     subject: "Email verification for {{site_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 25,
//     name: "Email Verification Partner",
//     subject: "Email verification for {{site_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 26,
//     name: "Offer cap changed",
//     subject: "Offer cap changed due to scheduled actons",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 27,
//     name: "Offer Creative Added",
//     subject: "Offer Creatives added",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 28,
//     name: "Offer Creatives Paused",
//     subject: "Offer Creatives Paused",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 29,
//     name: "Offer payout changed",
//     subject: "Offer payout changed due to scheduled actons",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 30,
//     name: "Offer status Active to Pause",
//     subject: "Application status changed",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 31,
//     name: "Offer status Pause to Active",
//     subject: "Application status changed",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 32,
//     name: "Partner account created",
//     subject: "User account created successfully",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 33,
//     name: "Partner invoice create",
//     subject: "Partner Invoice Create",
//     body:"",
//     isStatus: true,
//   },
//   { id: 34, name: "Partner Invoice Paid", subject: "Invoice paid",  body:"",
//     isStatus: true, },
//   {
//     id: 35,
//     name: "Partner KYC Approved",
//     subject: "KYC has been approved",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 36,
//     name: "Partner KYC Rejected",
//     subject: "KYC has been rejected",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 37,
//     name: "Partner Signup",
//     subject: "Your application has been received by {{network_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 38,
//     name: "Partner Signup Approval",
//     subject: "You have been approved by {{network_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 39,
//     name: "Partner Signup Rejected",
//     subject: "Your application for {{network_name}}",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 40,
//     name: "Password Reset Code",
//     subject: "Password Recovery",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 41,
//     name: "Password Reset Confirmation",
//     subject: "You have reset your password",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 42,
//     name: "scheduled action caps change",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 43,
//     name: "scheduled action creative activate",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 44,
//     name: "scheduled action creative pause",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 45,
//     name: "scheduled action offer activate",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 46,
//     name: "scheduled action offer pause",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 47,
//     name: "scheduled action offer group caps",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 48,
//     name: "scheduled action payout change",
//     subject: "Scheduled action created",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 49,
//     name: "Send Password Reset Mail",
//     subject: "Password Reset Request",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 50,
//     name: "Support Reply",
//     subject: "Reply Support Ticket",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 51,
//     name: "Suspend partner",
//     subject: "Notification of Partner Account Suspension",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 52,
//     name: "User activated advertiser partner",
//     subject: "Notice of Account Activation",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 53,
//     name: "User suspend advertiser partner",
//     subject: "Notice of Account Suspension",
//     body:"",
//     isStatus: true,
//   },
//   {
//     id: 54,
//     name: "User Account Created By Admin",
//     subject: "User Account Created.",
//     body:"",
//     isStatus: true,
//   },
// ];


export type ShortCode = {
  code: string;
  description: string;
};

export type ShortGroup = {
  title: string;
  codes: ShortCode[];
};

export type EmailTemplate = {
  id: number;
  name: string;
  subject: string;
  body?: string;
  shortGroupData?: ShortGroup[];
};

export const emailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: "Template 1",
    subject: "Welcome to Our Service",
    body: "<p>Hello {{user_1_name}}, welcome to our platform!</p>",
    shortGroupData: [
      {
        title: "User Details",
        codes: [
          { code: "{{user_1_name}}", description: "Full name of user 1" },
          { code: "{{user_1_email}}", description: "Email of user 1" },
        ],
      },
      {
        title: "Platform Info",
        codes: [
          { code: "{{platform_1_name}}", description: "Name of platform 1" },
          { code: "{{platform_1_url}}", description: "URL of platform 1" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Template 2",
    subject: "Order Confirmation",
    body: "<p>Hi {{user_2_name}}, your order {{order_2_id}} has been confirmed.</p>",
    shortGroupData: [
      {
        title: "User Info",
        codes: [
          { code: "{{user_2_name}}", description: "Name of user 2" },
          { code: "{{user_2_email}}", description: "Email of user 2" },
        ],
      },
      {
        title: "Order Info",
        codes: [
          { code: "{{order_2_id}}", description: "Order ID for template 2" },
          { code: "{{order_2_amount}}", description: "Total amount of order 2" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Template 3",
    subject: "Invoice Details",
    body: "<p>Dear {{user_3_name}}, your invoice {{invoice_3_number}} is ready.</p>",
    shortGroupData: [
      {
        title: "Invoice Info",
        codes: [
          { code: "{{invoice_3_number}}", description: "Invoice number" },
          { code: "{{invoice_3_date}}", description: "Invoice date" },
        ],
      },
      {
        title: "User Info",
        codes: [
          { code: "{{user_3_name}}", description: "Name of user 3" },
          { code: "{{user_3_email}}", description: "Email of user 3" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Template 4",
    subject: "Event Reminder",
    body: "<p>Hi {{user_4_name}}, don't forget the event {{event_4_name}} on {{event_4_date}}.</p>",
    shortGroupData: [
      {
        title: "Event Details",
        codes: [
          { code: "{{event_4_name}}", description: "Name of event 4" },
          { code: "{{event_4_date}}", description: "Date of event 4" },
          { code: "{{event_4_location}}", description: "Location of event 4" },
        ],
      },
      {
        title: "User Info",
        codes: [
          { code: "{{user_4_name}}", description: "Name of user 4" },
          { code: "{{user_4_email}}", description: "Email of user 4" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Template 5",
    subject: "Password Reset",
    body: "<p>Hi {{user_5_name}}, reset your password using this link: {{reset_5_link}}</p>",
    shortGroupData: [
      {
        title: "User Info",
        codes: [
          { code: "{{user_5_name}}", description: "Name of user 5" },
          { code: "{{user_5_email}}", description: "Email of user 5" },
        ],
      },
      {
        title: "Security Info",
        codes: [
          { code: "{{reset_5_link}}", description: "Password reset link for user 5" },
          { code: "{{reset_5_expiry}}", description: "Expiry time for reset link" },
        ],
      },
    ],
  },
  
];


export const getTemplateById = (id: string | number) =>
  emailTemplates.find((t) => t?.id === Number(id));
