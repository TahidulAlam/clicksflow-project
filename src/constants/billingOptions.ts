export const typeOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "bimonthly", label: "Bimonthly" },
  { value: "monthly", label: "Monthly" },
  { value: "twomonths", label: "Two months" },
  { value: "quarterly", label: "Quarterly" },
  { value: "manual", label: "Manual" },
  { value: "other", label: "Other" },
];

export const invoiceOption = [
  { value: "noDelay", label: "No Delay" },
  { value: "1day", label: "1 Day" },
  { value: "1week", label: "1 Week" },
  { value: "10days", label: "10 Days" },
  { value: "15days", label: "15 Days" },
  { value: "30days", label: "30 Days" },
  { value: "other", label: "Others" },
];

export const dayOptions = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

export const monthOptions = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

export const dayOfMonthOptions: ReadonlyArray<{ value: string; label: string }> = Array.from({ length: 31 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}`,
}));

export const paymentMethodsOptions = [
  { value: "none", label: "None", fields: [] },
  { value: "bitcoin", label: "Bitcoin", fields: ["bitcoin_address"] },
  {
    value: "capitalist",
    label: "Capitalist",
    fields: ["account_number", "name", "email"],
  },
  { value: "check", label: "Check", fields: ["recipient_name"] },
  {
    value: "direct_deposit",
    label: "Direct deposit",
    fields: [
      "bank_name",
      "bank_address",
      "account_name",
      "account_number",
      "routing_number_or_iban_or_short_code",
    ],
  },
  { value: "gift_card", label: "Gift card", fields: [] },
  { value: "payxum", label: "Payxum", fields: ["payxum_id_or_email"] },
  { value: "payoneer", label: "Payoneer", fields: ["email"] },
  { value: "paypal", label: "Paypal", fields: ["email"] },
  { value: "skrill", label: "Skrill", fields: ["email"] },
  { value: "tipalti", label: "Tipalti", fields: [] },
  { value: "transferwise", label: "Transferwise", fields: ["name", "email"] },
  {
    value: "veem",
    label: "Veem",
    fields: ["first_name", "last_name", "email", "phone", "country"],
  },
  {
    value: "webmoney",
    label: "Webmoney",
    fields: ["account_number", "name", "email"],
  },
  {
    value: "wire",
    label: "Wire",
    fields: [
      "bank_name",
      "bank_address",
      "account_name",
      "account_number",
      "routing_number_or_iban_or_short_code",
      "swift_code",
    ],
  },
]

export const paymentTermsOptions = [
  { value: "none", label: "none" },
  { value: "NET 7", label: "NET 7" },
  { value: "NET 15", label: "NET 15" },
  { value: "NET 30", label: "NET 30" },
  { value: "NET 60", label: "NET 60" },
  { value: "other", label: "Other" },
];