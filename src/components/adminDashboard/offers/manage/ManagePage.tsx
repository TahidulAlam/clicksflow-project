/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import Image from "next/image";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
  fixed?: "left" | "right";
  width?: string;
  stickyAfter?: number;
  cell?: (row: any) => React.ReactNode;
}

interface MenuItem {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  labelHeader?: string;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const categoryData = [
  {
    id: 13,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "Leptozan - SS - Diet Supplement - TSL & VSL - [US, CA, AU, NZ] (13)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Diet & Weight Loss",
    countries: "United States +3",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 12,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "(MOP) **NEW BANGER** My Online Profits $3 CTC - US/CA (12)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Biz Opp",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 8,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "CreditScoreIQ $1 7 Day Trial - US (8)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 7,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "SecureMax with Device Security - $1 7-Day - US/PR (7)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 6,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "Credit Score Hero V2 - $17 7 Days Trial (6)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 5,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "Credit Score Hero - $17 7 Days Trial (5)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 4,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "IdentityIQ Credit Essentials (US) $1 Trial - LifeStyle Lander (4)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 3,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 32,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 34,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 35,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 36,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 37,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
  {
    id: 38,
    thumbnail: "/ipqualitycheck.png",
    // thumbnail: "/ipqualitycheck.png",
    name: "ScoreCasterIQ (CTC) - $34.99 - Non-Incent (3)",
    visibility: "Approval Required",
    advertiser: "Test ADV (EF) (1)",
    category: "Financial - Credit Scores",
    countries: "United States +1",
    countriesname: "abariya",
    colme: "colme",
  },
];
const categoryColumns: Column[] = [
  {
    header: "ID",
    accessor: "id",
    width: "50px",
    fixed: "left",
    searchable: false,
  },
  {
    header: "Thumbnail",
    accessor: "thumbnail",
    width: "80px",
    // fixed: "left",
    stickyAfter: 1,
    cell: (row) => (
      <>
        <Image
          src={row.thumbnail}
          alt="thumb"
          width={40}
          height={40}
          className="rounded"
        />
      </>
    ),
  },

  {
    header: "Name",
    accessor: "name",
    width: "400px",
    stickyAfter: 0,
    fixed: "left",
    searchable: true,
  },
  {
    header: "Visibility",
    accessor: "visibility",
    searchable: false,
    width: "200px",
    // fixed: "left",
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,

    width: "200px",
  },
  {
    header: "Category",
    accessor: "category",
    searchable: true,
    width: "200px",
  },
  {
    header: "Countries",
    accessor: "countries",
    searchable: false,
    width: "200px",
  },
  {
    header: "Countriesname",
    accessor: "countriesname",
    width: "200px",
    searchable: false,
  },

  {
    header: "Colme",
    accessor: "colme",
    width: "100px",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    fixed: "right",
    width: "80px",
    cell: (row) => {
      const menuItems: MenuItem[] = [
        {
          label: "Edit",
          icon: <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />,
          onClick: () => toast.success(`Edit clicked for ID: ${row.id}`),
        },
      ];

      return (
        <div className="z-50">
          <MultiLevelDropdown
            label={
              <>
                <BsThreeDotsVertical />
              </>
            }
            labelClass="text-sm font-bold border-none shadow-none -z-10 bg-none"
            position="bottom-right"
            menuClassName="z-50"
            menuItems={menuItems}
          />
        </div>
      );
    },
  },
];
const ManagePage = () => {
  return (
    <DataList
      data={categoryData}
      columns={categoryColumns}
      showLinkButton={true}
      addLink="/admin/offers/add"
      showSearchBar={true}
      showColumnToggle={true}
      showfilter={true}
      filterLabel="All"
      enableRowSelection={true}
      pageSizeOptions={[5, 10, 20, 50, 100]}
    />
  );
};

export default ManagePage;
