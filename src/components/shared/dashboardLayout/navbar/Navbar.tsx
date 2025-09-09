"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import MultiLevelDropdown from "../../dropdown/MultiLevelDropdown";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
interface NavbarProps {
  toggleSidebar: () => void;
}
interface MenuItem<T = Record<string, unknown>> {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (row?: T) => void;
  labelHeader?: string;
  children?: MenuItem<T>[];
  content?: React.ReactNode;
}
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const pathname = usePathname();
  // const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultFilterItems: MenuItem[] = [
    {
      // label: "User",
      content: (
        <div className="text-sm text-gray-700 flex flex-col items-center gap-2 bg-[#F2F7FD] p-4">
          <h1>support@revsbill.com</h1>
          <Image
            src="/favicon.png"
            alt="Small Logo"
            width={40}
            height={40}
            className={`w-10 h-10 rounded-full object-cover transition-all duration-300 `}
          />
          <button
            type="button"
            className="w-full mt-2 px-4 py-2 text-white bg-amber-950 border border-gray-300  rounded-2xl text-xs"
          >
            My account
          </button>
          <div className="flex gap-2 w-full">
            <button
              type="button"
              className="w-full mt-2 px-4 py-3 bg-white text-black hover:text-white hover:bg-amber-950   rounded-l-2xl text-xs"
            >
              My account
            </button>
            <button
              type="button"
              className="w-full mt-2 px-4 py-3 bg-white text-black hover:text-white hover:bg-amber-950  rounded-r-2xl text-xs"
            >
              My account
            </button>
          </div>
        </div>
      ),
    },
  ];

  const getLastPathName = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length ? segments[segments.length - 1] : "Home";
  };

  return (
    <div className="flex justify-between items-center bg-[#F2F7FD] px-[16px] py-[8px] rounded-lg relative border border-gray-300">
      {/* Left: Path Name */}
      <div className="text-gray-600 font-semibold capitalize text-sm lg:block hidden">
        {getLastPathName()}
      </div>

      {/* Middle: Message */}
      {/* <div className="text-gray-800 font-medium text-sm lg:block hidden">
        Welcome!
      </div> */}

      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <FiMenu className="text-xl text-blue-950" />
      </button>
      <div className="text-gray-600 font-semibold capitalize text-sm block lg:hidden">
        {getLastPathName()}
      </div>

      <MultiLevelDropdown
        label={<FaRegUserCircle className="w-4 h-4 text-blue-950" />}
        labelClass="text-sm bg-white px-2 py-2 rounded-md border "
        position="bottom-right"
        submenuPosition="left"
        menuClassName="w-76 rounded-lg  bg-[#F2F7FD]"
        menuItems={defaultFilterItems}
        ariaLabel="Table filter options"
      />
    </div>
  );
};

export default Navbar;
