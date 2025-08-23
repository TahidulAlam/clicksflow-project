"use client";
import React from "react";

interface FormData {
  skype: string;
  enterYourFacebookUrl: string;
  howLongHaveYouBeenInAffiliateMarketing: string;
  howDidYouHearAboutProfitnextNetwork: string;
  primaryVertical: string;
  listYourTopFiveCampaignName: string;
  currentEarningsPerWeekOnYourCampaign: string;
  whichNetworksAreYouRunningWithNow: string;
}

const PSUCustomInfo: React.FC = () => {
  const formData: FormData[] = [
    {
      skype: "text",
      enterYourFacebookUrl: "text",
      howLongHaveYouBeenInAffiliateMarketing: "text",
      howDidYouHearAboutProfitnextNetwork: "text",
      primaryVertical: "text",
      listYourTopFiveCampaignName: "text",
      currentEarningsPerWeekOnYourCampaign: "text",
      whichNetworksAreYouRunningWithNow: "text",
    },
  ];

  const labelMap: Record<keyof FormData, string> = {
    skype: "Skype",
    enterYourFacebookUrl: "Facebook URL",
    howLongHaveYouBeenInAffiliateMarketing: "Affiliate Marketing Experience",
    howDidYouHearAboutProfitnextNetwork: "Referral Source",
    primaryVertical: "Primary Vertical",
    listYourTopFiveCampaignName: "Top 5 Campaigns",
    currentEarningsPerWeekOnYourCampaign: "Weekly Earnings",
    whichNetworksAreYouRunningWithNow: "Active Networks",
  };

  return (
    <div className="space-y-6">
      {formData.map((data, index) => (
        <div
          key={index}
          className="overflow-x-auto rounded-lg shadow-md border border-gray-200"
        >
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-4">Label</th>
                <th className="px-3 py-4">Value</th>
                <th className="px-3 py-4">Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-2 py-1 font-medium text-xs text-gray-800 whitespace-nowrap">
                    {labelMap[key as keyof FormData] || key}
                  </td>
                  <td className="px-2 py-1 text-gray-600 break-words max-w-sm">
                    {value}
                  </td>
                  <td className="px-2 py-1 text-gray-900 text-xs">Required</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PSUCustomInfo;
