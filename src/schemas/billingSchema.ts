import { dayOfMonthOptions, dayOptions, invoiceOption, monthOptions, typeOptions } from "@/constants/billingOptions";
import * as z from "zod";


export const billingFrequencyEnum = z.enum(
  typeOptions.map((opt) => opt.value) as [string, ...string[]],
  { required_error: "Billing frequency is required" }
);

export const paymentMethodEnum = z.enum(
  [
    "none",
    "bitcoin",
    "capitalist",
    "check",
    "direct_deposit",
    "gift_card",
    "payxum",
    "payoneer",
    "paypal",
    "skrill",
    "tipalti",
    "transferwise",
    "veem",
    "webmoney",
    "wire",
  ] as [string, ...string[]],
  { required_error: "Payment method is required" }
);

export const billingSchema = z
  .object({
    billingFrequency: billingFrequencyEnum,
    paymentMethods: paymentMethodEnum,
    taxID: z.string().optional(),
    bitcoin_address: z.string().optional(),
    account_number: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    recipient_name: z.string().optional(),
    bank_name: z.string().optional(),
    bank_address: z.string().optional(),
    account_name: z.string().optional(),
    routing_number_or_iban_or_short_code: z.string().optional(),
    payxum_id_or_email: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    swift_code: z.string().optional(),
    day: z.enum(dayOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    monthly: z.enum(dayOfMonthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    bimonthly1: z.enum(dayOfMonthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    bimonthly2: z.enum(dayOfMonthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    startingMonth1: z.enum(monthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    dayofMonth1: z.enum(dayOfMonthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    startingMonth2: z.enum(monthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    dayofMonth2: z.enum(dayOfMonthOptions.map((opt) => opt.value) as [string, ...string[]]).optional(),
    automaticInvoiceCreation: z.boolean().optional(),
    invoiceGen: z.enum(invoiceOption.map((opt) => opt.value) as [string, ...string[]]).optional(),
    invoiceStartDate: z.date().optional(),
    taxPercentage: z.number().min(0).optional(),
    autoInvoiceAmountThreshold: z.number().min(0).optional(),
  })
  .refine(
    (data) => {
      switch (data.billingFrequency) {
        case "weekly":
          return !!data.day;
        case "bimonthly":
          return !!data.bimonthly1 && !!data.bimonthly2;
        case "monthly":
          return !!data.monthly;
        case "twomonths":
          return !!data.startingMonth1 && !!data.dayofMonth1;
        case "quarterly":
          return !!data.startingMonth2 && !!data.dayofMonth2;
        default:
          return true;
      }
    },
    {
      message: "Required fields are missing for the selected billing frequency",
      path: ["billingFrequency"],
    }
  );

export type BillingFormType = z.infer<typeof billingSchema>;