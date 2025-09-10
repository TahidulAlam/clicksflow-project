/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { createSwapy, SwapEvent } from "swapy";
import { FiRefreshCw } from "react-icons/fi";
import MetricCard from "./MetricCard";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { HiViewGridAdd } from "react-icons/hi";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import DataListSkeleton from "@/components/shared/skeleton/DataListSkeleton";
import dynamic from "next/dynamic";

const DataList = dynamic(
  () => import("@/components/shared/dataTable/DataList"),
  {
    ssr: false,
    loading: () => (
      <DataListSkeleton rows={5} columns={12} showToolbar={true} />
    ),
  }
);
import Link from "next/link";

export type MetricKey = keyof typeof METRICS;
export type SlotLayout = Record<string, MetricKey>;

const DEFAULT_LAYOUT: SlotLayout = {
  "1": "cpc",
  "2": "payout",
  "3": "margin",
  "4": "profit",
  "5": "conversions",
  "6": "uniqueClicks",
  "7": "invalidClicks",
  "8": "revenue",
  "9": "grossClick",
  "10": "epc",
  "11": "clicks",
  "12": "impressions",
};

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  cell?: (row: any) => React.ReactNode;
}
const ListData = [
  // {
  //   id: 1,
  //   Id: "INV-001",
  //   advertiser: "Partner A",
  //   status: "Pending",
  //   advertiserVisibility: "Private",
  //   paymentTerms: "Net 30",
  //   startDate: "2025-05-01",
  //   endDate: "2025-05-31",
  //   amount: "$1,200.00",
  //   publicNotes: "Expected to clear within 30 days",
  //   internalNotes: "Partner has good history",
  //   dateCreated: "2025-05-01",
  //   lastModified: "2025-05-20",
  //   action: "Review",
  // },
  {},
];

//  table columns
const Columns: Column[] = [
  {
    header: " ID",
    accessor: "Id",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
  },
  {
    header: "Advertiser Visibility",
    accessor: "advertiserVisibility",
    searchable: true,
  },
  {
    header: "Payment Terms",
    accessor: "paymentTerms",
    searchable: true,
  },
  {
    header: "Time Period",
    accessor: "timePeriod",
    searchable: false,
    cell: (row: any) => `${row.startDate} to ${row.endDate}`,
  },
  {
    header: "Amount",
    accessor: "amount",
    searchable: false,
  },
  {
    header: "Public Notes",
    accessor: "publicNotes",
    searchable: true,
    width: "200px",
  },
  {
    header: "Internal Notes",
    accessor: "internalNotes",
    searchable: true,
  },
  {
    header: "Date Created",
    accessor: "dateCreated",
    searchable: false,
  },
  {
    header: "Last Modification",
    accessor: "lastModified",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const METRICS = {
  cpc: { id: "cpc", title: "CPC", unit: "$", isMoney: true },
  payout: { id: "payout", title: "Payout", unit: "$", isMoney: true },
  margin: { id: "margin", title: "Margin", unit: "%", isMoney: false },
  profit: { id: "profit", title: "Profit", unit: "$", isMoney: true },
  conversions: {
    id: "conversions",
    title: "Conversions",
    unit: "",
    isMoney: false,
  },
  uniqueClicks: {
    id: "uniqueClicks",
    title: "Unique Clicks",
    unit: "",
    isMoney: false,
  },
  invalidClicks: {
    id: "invalidClicks",
    title: "Invalid Clicks",
    unit: "",
    isMoney: false,
  },
  revenue: { id: "revenue", title: "Revenue", unit: "$", isMoney: true },
  grossClick: {
    id: "grossClick",
    title: "Gross Click",
    unit: "",
    isMoney: false,
  },
  epc: { id: "epc", title: "EPC", unit: "$", isMoney: true },
  clicks: { id: "clicks", title: "Clicks", unit: "", isMoney: false },
  impressions: {
    id: "impressions",
    title: "Impressions",
    unit: "",
    isMoney: false,
  },
} as const;

export default function DnDGrid() {
  const [slotItems, setSlotItems] = useState<SlotLayout>(DEFAULT_LAYOUT);
  const [searchQuery, setSearchQuery] = useState("");

  // Load layout from localStorage only on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("metricOrder");
      if (saved) {
        setSlotItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading layout:", err);
    }
  }, []);

  // Save layout whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("metricOrder", JSON.stringify(slotItems));
    } catch (err) {
      console.error("Error saving layout:", err);
    }
  }, [slotItems]);

  const metricCards = useMemo(
    () =>
      Object.entries(slotItems).map(([slot, metricKey]) => {
        const metric = METRICS[metricKey];
        return (
          <div key={slot} data-swapy-slot={slot}>
            <div data-swapy-item={metric.id}>
              <MetricCard {...metric} />
            </div>
          </div>
        );
      }),
    [slotItems]
  );

  // const handleSwap = useCallback((event: SwapEvent) => {
  //   const updatedLayout = (event as unknown as { newState: SlotLayout })
  //     .newState;
  //   if (updatedLayout) {
  //     setSlotItems(updatedLayout);
  //   }
  // }, []);

  //   const handleSwap = useCallback((event: SwapEvent) => {
  //   const updatedLayout = (event as unknown as { newState: SlotLayout }).newState;
  //   if (updatedLayout) {
  //     setSlotItems(updatedLayout);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  //   if (!isDesktop) return;

  //   const container = document.querySelector(".dnd-container");
  //   if (!(container instanceof HTMLElement)) return;

  //   const swapy = createSwapy(container);
  //   swapy.onSwap(handleSwap);

  //   return () => swapy.destroy();
  // }, [handleSwap]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const container = document.querySelector(".dnd-container");
    if (!(container instanceof HTMLElement)) return;

    const swapy = createSwapy(container);
    swapy.onSwap((event: SwapEvent) => {
      const updatedLayout = (event as unknown as { newState: SlotLayout })
        .newState;
      if (updatedLayout) {
        setSlotItems(updatedLayout);
      }
    });

    return () => swapy.destroy();
  }, []); // ✅ only run once

  const handleToggle = (metricKey: MetricKey) => {
    setSlotItems((prev) => {
      const isEnabled = Object.values(prev).includes(metricKey);
      const newLayout = { ...prev };

      if (isEnabled) {
        Object.keys(newLayout).forEach((slot) => {
          if (newLayout[slot] === metricKey) delete newLayout[slot];
        });
      } else {
        const defaultSlot = Object.entries(DEFAULT_LAYOUT).find(
          ([, key]) => key === metricKey
        )?.[0];
        if (defaultSlot) newLayout[defaultSlot] = metricKey;
      }

      return newLayout;
    });
  };

  const filteredMetrics = Object.values(METRICS).filter((metric) =>
    metric.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="z-20 pt-0 lg:flex justify-between hidden items-center">
        <h1 className="text-sm  py-2 px-3 border border-gray-300 rounded-md text-gray-700">
          Hi Admin, you have{" "}
          <span className="text-blue-500">0 conversions</span>,{" "}
          <span className="text-blue-500">0 requests</span> and{" "}
          <span className="text-blue-500">0 partners</span> pending approval.
        </h1>
        <MultiLevelDropdown
          label={<HiViewGridAdd className="w-4 h-4 text-blue-950" />}
          position="bottom-right"
          submenuPosition="left"
          menuItems={[
            {
              labelHeader: "Dashboard Customization",
              label: "Matrix",
              children: [
                {
                  content: (
                    <div className="w-80 p-3 z-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="ml-2 font-medium">Matrix</span>
                        <button
                          onClick={() => setSlotItems(DEFAULT_LAYOUT)}
                          className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
                          title="Reset to Default"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Search metrics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-md text-sm"
                      />
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filteredMetrics.map((metric) => (
                          <div
                            key={metric.id}
                            className="flex items-center justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100"
                          >
                            <span className="text-sm">{metric.title}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(slotItems).includes(
                                  metric.id
                                )}
                                onChange={() => handleToggle(metric.id)}
                                className="sr-only"
                              />
                              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative">
                                <div
                                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                    Object.values(slotItems).includes(metric.id)
                                      ? "translate-x-5 bg-blue-950"
                                      : ""
                                  }`}
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ],
            },
            {
              label: "Card",
              children: [
                {
                  content: (
                    <div className="w-80 p-3 z-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="ml-2 font-medium">Matrix</span>
                        <button
                          onClick={() => setSlotItems(DEFAULT_LAYOUT)}
                          className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
                          title="Reset to Default"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Search metrics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-md text-sm"
                      />
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filteredMetrics.map((metric) => (
                          <div
                            key={metric.id}
                            className="flex items-center justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100"
                          >
                            <span className="text-sm">{metric.title}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(slotItems).includes(
                                  metric.id
                                )}
                                onChange={() => handleToggle(metric.id)}
                                className="sr-only"
                              />
                              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative">
                                <div
                                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                    Object.values(slotItems).includes(metric.id)
                                      ? "translate-x-5 bg-blue-950"
                                      : ""
                                  }`}
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ],
            },
          ]}
        />
      </div>

      <div className="mt-5 hidden lg:block">
        <div className="dnd-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {metricCards}
        </div>
      </div>

      {/* Mobile/Tablet Non-DnD Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
        {Object.values(slotItems).map((metricKey) => {
          const metric = METRICS[metricKey];
          return <MetricCard key={metric.id} {...metric} />;
        })}
      </div>
      <div className="mt-5">
        <BoxAccordion collapsible={false}>
          <BoxHeader className="bg-blue-100 flex justify-between items-center">
            <h2 className="text-sm font-base py-1">Offers</h2>
            <Link href={"/admin/offers/add"} className="text-blue-950 text-sm">
              + Add Offer
            </Link>
          </BoxHeader>
          <BoxContent>
            <div className="p-2">
              <DataList
                data={ListData}
                columns={Columns}
                showLinkButton={false}
                showSearchBar={false}
                showColumnToggle={false}
                showfilter={false}
                headerRowClassName="bg-white"
              />
            </div>
          </BoxContent>
        </BoxAccordion>
      </div>
      <div className="mt-5">
        <BoxAccordion collapsible={false}>
          <BoxHeader className="bg-blue-100 flex justify-between items-center">
            <h2 className="text-sm font-base py-1">Advertiser</h2>
            <Link
              href={"/admin/advertiser/add"}
              className="text-blue-950 text-sm"
            >
              + Add Advertiser
            </Link>
          </BoxHeader>
          <BoxContent>
            <div className="p-2">
              <DataList
                data={ListData}
                columns={Columns}
                showLinkButton={false}
                showSearchBar={false}
                showColumnToggle={false}
                showfilter={false}
                headerRowClassName="bg-white"
              />
            </div>
          </BoxContent>
        </BoxAccordion>
      </div>
      <div className="mt-5">
        <BoxAccordion collapsible={false}>
          <BoxHeader className="bg-blue-100 flex justify-between items-center">
            <h2 className="text-sm font-base py-1">Partner</h2>
            <Link href={"/admin/partner/add"} className="text-blue-950 text-sm">
              + Add Partner
            </Link>
          </BoxHeader>
          <BoxContent>
            <div className="p-2">
              <DataList
                data={ListData}
                columns={Columns}
                showLinkButton={false}
                showSearchBar={false}
                showColumnToggle={false}
                showfilter={false}
                headerRowClassName="bg-white"
              />
            </div>
          </BoxContent>
        </BoxAccordion>
      </div>
      {/* <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="relative w-[90%] max-w-4xl bg-white rounded-2xl  p-6">
            <div className="absolute -top-4 left-0 flex items-center gap-2 rounded-tl-2xl bg-white  px-4 py-2">
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                ◀
              </button>
              <span className="text-sm text-gray-500">1/6</span>
              <button className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                ▶
              </button>
            </div>

            <div className="absolute -top-4 right-0 flex items-center gap-2 rounded-tr-2xl bg-white  px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
              <span className="text-sm text-gray-600">
                Next.js 15.3.0 <span className="text-red-400">(stale)</span>
              </span>
              <span className="text-sm text-blue-500 font-medium">
                Turbolpack
              </span>
            </div>

            <div className="mt-6 h-64 rounded-xl border border-gray-100"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
