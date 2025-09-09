"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";

interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  href?: string;
  hasSubMenu?: boolean;
  subMenu?: SubMenuItem[];
  open: boolean;
  expanded?: boolean;
  toggleSubMenu?: () => void;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  icon,
  href,
  hasSubMenu,
  subMenu,
  open,
  expanded,
  toggleSubMenu,
}) => {
  const pathname = usePathname();
  const submenuRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (expanded && submenuRef.current) {
      setHeight(`${submenuRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [expanded]);

  const isActive = href && pathname === href;
  const isSubActive = subMenu?.some((item) => pathname === item.href);

  const renderMainLink = () => (
    <Link
      href={href!}
      className={`flex items-center ${
        open ? "" : "justify-center"
      } gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-[#1E3557] text-white"
          : "text-gray-700  hover:bg-gray-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="text-sm">{title}</span>}
    </Link>
  );

  const renderDropdownToggle = () => (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
        open ? "justify-between" : "justify-center"
      } ${
        isSubActive
          ? "bg-[#1E3557] text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={open ? toggleSubMenu : undefined}
    >
      <div className="flex items-center gap-3 ">
        <span className="text-xl">{icon}</span>
        {open && <span className="text-sm">{title}</span>}
      </div>
      {open && hasSubMenu && (
        <span
          className={`transition-transform duration-300  ${
            expanded ? "rotate-90" : ""
          }`}
        >
          <FaChevronRight />
        </span>
      )}
    </div>
  );

  const renderExpandedSubMenu = () => (
    <ul
      ref={submenuRef}
      style={{ maxHeight: height }}
      className="pl-5 mt-1  space-y-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
    >
      {subMenu?.map((sub) => {
        const active = pathname === sub.href;
        return (
          <li key={sub.title}>
            <Link
              href={sub.href}
              className={`block text-sm rounded-md px-3  py-3 ${
                active
                  ? "bg-[#1E3557] text-white"
                  : "text-[#1E3557] hover:bg-zinc-100"
              }`}
            >
              {sub.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // 👉 Hover submenu (when sidebar is collapsed)
  const renderHoverSubMenu = () => (
    <div className="absolute top-0  left-full ml-2 hidden group-hover:block z-[9999]">
      <div className="bg-white border border-gray-300 border-b-none rounded-t-lg">
        <h1 className="text-lg text-blue-950 px-3 py-3">{title}</h1>
      </div>
      <ul className="bg-white max-h-[250px] overflow-y-scroll border border-gray-300 rounded-b-lg rounded-x-lg py-2 px-3 min-w-max text-sm text-[#1E3557]">
        {/* <li className="text-lg text-gray-500 border-b-2 pb-1 mb-5 border-b-gray-500">
          {title}
        </li> */}
        {subMenu?.map((sub) => {
          const active = pathname === sub.href;
          return (
            <li
              key={sub.title}
              className={`whitespace-nowrap px-5 w-52 py-3 rounded-md ${
                active ? "bg-[#1E3557] text-white" : "hover:bg-zinc-100"
              }`}
            >
              <Link href={sub.href} className="flex items-center gap-2">
                {/* <FaChevronRight className="text-xs" /> */}
                {sub.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <li className={`relative ${!open && hasSubMenu ? "group" : ""}`}>
      {hasSubMenu ? renderDropdownToggle() : renderMainLink()}
      {hasSubMenu && open && renderExpandedSubMenu()}
      {hasSubMenu && !open && renderHoverSubMenu()}
    </li>
  );
};

export default MenuItem;
