import { MdSpaceDashboard, MdPeople, MdSettings } from "react-icons/md";
import {
  FaRegFolder,
  FaHandshake,
  FaFileInvoice,
  FaChartBar,
} from "react-icons/fa";
import { FiBarChart } from "react-icons/fi";
import { BiChat } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi2";
import { FaGears } from "react-icons/fa6";

export type UserType = "admin" | "partner" | "advertiser";

interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  gap?: boolean;
  href?: string;
  key?: string;
  subMenu?: SubMenuItem[];
}

export const MENU_CONFIG: Record<UserType, MenuItem[]> = {
  admin: [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      href: "/admin/dashboard",
    },
    {
      title: "Offers",
      icon: <FaRegFolder />,
      key: "offers",
      subMenu: [
        { title: "Manage", href: "/admin/offers/list" },
        { title: "Add", href: "/admin/offers/add" },
        { title: "Offer Group", href: "/admin/offers/group/list" },
        { title: "Smart Link", href: "/admin/offers/smart-link/list" },
        { title: "Creatives", href: "/admin/offers/creative/list?status=1" },
        {
          title: "Traffic Control",
          href: "/admin/offers/traffic/control/list",
        },
        { title: "Custom Setting", href: "/admin/offers/custom-setting" },
      ],
    },
    {
      title: "Partners",
      icon: <FaHandshake />,
      key: "partners",
      subMenu: [
        { title: "Manage", href: "/admin/partner/list" },
        { title: "Add", href: "/admin/partner/add" },
        { title: "KYC", href: "/admin/partner/kyc" },
        { title: "Postback", href: "/admin/partner/postback/conversion" },
        { title: "Partner Tiers", href: "/admin/partner/tier/list" },
        {
          title: "Offer Applications",
          href: "/admin/partner/offer/applications",
        },
        {
          title: "Traffic Blocking",
          href: "/admin/partner/traffic-blocking/list",
        },
        { title: "Traffic Source", href: "/admin/partner/traffic-source/list" },
        { title: "Adjustment", href: "/admin/partner/adjustment/list" },
        { title: "Invoice", href: "/admin/partner/invoice/list" },
        { title: "Payment Method", href: "/admin/partner/payment-method/list" },
        { title: "Announcement", href: "/admin/partner/announcement/form" },
      ],
    },
    {
      title: "Advertisers",
      icon: <MdPeople />,
      key: "advertisers",
      subMenu: [
        { title: "Manage", href: "/admin/advertiser/list" },
        { title: "Add", href: "/admin/advertiser/add" },
        { title: "KYC", href: "/admin/advertiser/kyc" },
        {
          title: "Postback Control",
          href: "/admin/advertiser/postback/control/list",
        },
        { title: "Invoice", href: "/admin/advertiser/invoice/list" },
      ],
    },
    {
      title: "Reportings",
      icon: <FaChartBar />,
      key: "reportings",
      subMenu: [
        { title: "Offer", href: "/admin/reporting/offer" },
        { title: "Partner", href: "/admin/reporting/partner" },
        { title: "Advertiser", href: "/admin/reporting/advertiser" },
        { title: "SmartLink", href: "/admin/reporting/smart-link" },
        { title: "Daily", href: "/admin/reporting/daily" },
        { title: "Impression", href: "/admin/reporting/impression" },
        { title: "Click", href: "/admin/reporting/click" },
        { title: "Conversion", href: "/admin/reporting/conversion" },
        {
          title: "Click To Conversion",
          href: "/admin/reporting/click-to-conversion",
        },
        {
          title: "Partner Postback",
          href: "/admin/reporting/partner-postback",
        },
        {
          title: "Advertiser Postback",
          href: "/admin/reporting/advertiser-postback",
        },
        {
          title: "Partner Referral Bonus",
          href: "/admin/reporting/partner-referral",
        },
        { title: "Saved Report", href: "/admin/reporting/saved-report" },
      ],
    },
    {
      title: "Marketplace",
      icon: <HiShoppingBag />,
      href: "/admin/marketplace",
    },
    {
      title: "Control Center",
      icon: <FaGears />,
      key: "control-center",
      subMenu: [
        { title: "My Account", href: "/admin/control/my-account/info" },
        { title: "Platform Notifications", href: "/admin/notifications" },
        { title: "Business Unit", href: "/admin/control/business/unit/list" },
        { title: "Accounts", href: "/admin/control/accounts/list" },
        { title: "Usage", href: "/admin/control/network/usage" },
        { title: "Direct Message", href: "/admin/control/message/direct" },
        { title: "Role", href: "/admin/control/role/list" },
        {
          title: "Scheduled Actions",
          href: "/admin/control/scheduled-action/list",
        },
        { title: "Category", href: "/admin/control/category/list" },
        { title: "Documents", href: "/admin/control/document/list" },
        { title: "Label", href: "/admin/control/label/list" },
        { title: "Channel", href: "/admin/control/channel/list" },
        { title: "Support Tickets", href: "/admin/tickets" },
        {
          title: "Integration",
          href: "/admin/control/integration/email/setting",
        },
        {
          title: "Configuration",
          href: "/admin/control/configuration/general",
        },
      ],
    },
  ],
  partner: [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      href: "/partner/dashboard",
    },
    { title: "Offers", icon: <FaRegFolder />, href: "/partner/offers" },
    {
      title: "Smart Link",
      icon: <FiBarChart />,
      href: "/partner/smart-link/list",
    },
    {
      title: "Postback",
      icon: <BiChat />,
      href: "/partner/postback/conversion",
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      key: "reports",
      subMenu: [
        { title: "Offer", href: "/partner/report/offer" },
        { title: "Sub ID", href: "/partner/report/sub-id" },
        { title: "Daily", href: "/partner/report/daily" },
        { title: "SmartLink", href: "/partner/report/smart.link" },
        { title: "Click", href: "/partner/report/click" },
        { title: "Conversion", href: "/partner/report/conversion" },
        { title: "Postback", href: "/partner/report/postback" },
        { title: "Referral", href: "/partner/report/referral" },
      ],
    },
    {
      title: "Company Settings",
      icon: <MdSettings />,
      key: "company-settings",
      subMenu: [
        { title: "My Account", href: "/partner/control/my-account/info" },
        { title: "Document", href: "/partner/control/documents" },
        { title: "Integration", href: "/partner/control/integration" },
        { title: "Billing", href: "/partner/control/billing" },
        { title: "Invoice", href: "/partner/control/invoice/list" },
        { title: "Support Ticket", href: "/partner/control/ticket/list" },
      ],
    },
  ],
  advertiser: [
    {
      title: "Dashboard",
      icon: <MdSpaceDashboard />,
      href: "/advertiser/dashboard",
    },
    { title: "Offers", icon: <FaRegFolder />, href: "/advertiser/offers" },
    {
      title: "Reports",
      icon: <FaChartBar />,
      key: "reports",
      subMenu: [
        { title: "Offer", href: "/advertiser/report/offer" },
        { title: "Daily", href: "/advertiser/report/daily" },
        { title: "Click", href: "/advertiser/report/click" },
        { title: "Conversion", href: "/advertiser/report/conversion" },
      ],
    },
    {
      title: "Documents",
      icon: <FaFileInvoice />,
      href: "/advertiser/documents",
    },
    {
      title: "Control Center",
      icon: <FaGears />,
      key: "control-center",
      subMenu: [
        { title: "My Account", href: "/advertiser/control/my-account/info" },
        { title: "Setting", href: "/advertiser/control/setting" },
        { title: "Invoice", href: "/advertiser/control/invoice/list" },
        { title: "Support Ticket", href: "/advertiser/control/ticket/list" },
      ],
    },
  ],
};
