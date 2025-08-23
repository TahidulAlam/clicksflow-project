// constants/attributionOptions.ts
export const attributionMethodOptions = [
    { value: "firstPartnerAttribution", label: "First Partner Attribution" },
    { value: "secondPartnerAttribution", label: "Second Partner Attribution" },
  ];
  
  export const conversionStatusOptions = [
    { value: "pending", label: "Pending" },
    { value: "rejected", label: "Rejected" },
  ];
  
  export const timeOptions = {
    minConversion: [
      { value: "disabled", label: "Disabled" },
      { value: "15seconds", label: "15 Seconds" },
      { value: "30seconds", label: "30 Seconds" },
      { value: "1minutes", label: "1 Minute" },
      { value: "5minutes", label: "5 Minutes" },
      { value: "custom", label: "Custom" },
    ],
    intervals: [
      { value: "seconds", label: "Seconds" },
      { value: "minutes", label: "Minutes" },
      { value: "hours", label: "Hours" },
      { value: "days", label: "Days" },
      { value: "weeks", label: "Weeks" },
    ],
    lookbackWindow: [
      { value: "disabled", label: "Disabled" },
      { value: "15seconds", label: "15 Seconds" },
      { value: "30seconds", label: "30 Seconds" },
      { value: "1minutes", label: "1 Minute" },
      { value: "5minutes", label: "5 Minutes" },
      { value: "custom", label: "Custom" },
    ],
  };