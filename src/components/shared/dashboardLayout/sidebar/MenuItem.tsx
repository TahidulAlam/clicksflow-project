// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaChevronRight } from "react-icons/fa";

// interface SubMenuItem {
//   title: string;
//   href: string;
// }

// interface MenuItemProps {
//   title: string;
//   icon: React.ReactNode;
//   href?: string;
//   hasSubMenu?: boolean;
//   subMenu?: SubMenuItem[];
//   open: boolean;
//   expanded?: boolean;
//   toggleSubMenu?: () => void;
//   onClick?: () => void;
// }

// const MenuItem: React.FC<MenuItemProps> = ({
//   title,
//   icon,
//   href,
//   hasSubMenu,
//   subMenu,
//   open,
//   expanded,
//   toggleSubMenu,
// }) => {
//   const pathname = usePathname();
//   const submenuRef = useRef<HTMLUListElement>(null);
//   const [height, setHeight] = useState("0px");

//   useEffect(() => {
//     if (expanded && submenuRef.current) {
//       setHeight(`${submenuRef.current.scrollHeight}px`);
//     } else {
//       setHeight("0px");
//     }
//   }, [expanded]);

//   const isActive = href && pathname === href;
//   const isSubActive = subMenu?.some((item) => pathname === item.href);

//   const renderMainLink = () => (
//     <Link
//       href={href!}
//       className={`flex items-center ${
//         open ? "" : "justify-center"
//       } gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out ${
//         isActive
//           ? "bg-[#1E3557] text-white"
//           : "text-gray-700  hover:bg-gray-100"
//       }`}
//     >
//       <span className="text-xl">{icon}</span>
//       {open && <span className="text-md">{title}</span>}
//     </Link>
//   );

//   const renderDropdownToggle = () => (
//     <div
//       className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
//         open ? "justify-between" : "justify-center"
//       } ${
//         isSubActive
//           ? "bg-[#1E3557] text-white"
//           : "text-gray-700 hover:bg-gray-100"
//       }`}
//       onClick={open ? toggleSubMenu : undefined}
//     >
//       <div className="flex items-center gap-3 ">
//         <span className="text-xl">{icon}</span>
//         {open && <span className="text-md">{title}</span>}
//       </div>
//       {open && hasSubMenu && (
//         <span
//           className={`transition-transform duration-300  ${
//             expanded ? "rotate-90" : ""
//           }`}
//         >
//           <FaChevronRight />
//         </span>
//       )}
//     </div>
//   );

//   const renderExpandedSubMenu = () => (
//     <ul
//       ref={submenuRef}
//       style={{ maxHeight: height }}
//       className="pl-5 mt-1  space-y-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
//     >
//       {subMenu?.map((sub) => {
//         const active = pathname === sub.href;
//         return (
//           <li key={sub.title}>
//             <Link
//               href={sub.href}
//               className={`block text-md rounded-md px-3  py-3 ${
//                 active
//                   ? "bg-[#1E3557] text-white"
//                   : "text-[#1E3557] hover:bg-zinc-100"
//               }`}
//             >
//               {sub.title}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );

//   // 👉 Hover submenu (when sidebar is collapsed)
//   const renderHoverSubMenu = () => (
//     <div className="absolute top-0  left-full ml-6 hidden group-hover:block z-[9999]">
//       <div className="bg-white border border-gray-300 border-b-none rounded-t-lg">
//         <h1 className="text-lg text-blue-950 px-3 py-3">{title}</h1>
//       </div>
//       <ul className="bg-white max-h-[250px] overflow-y-scroll border border-gray-300 rounded-b-lg rounded-x-lg py-2 px-3 min-w-max text-md text-[#1E3557]">
//         {/* <li className="text-lg text-gray-500 border-b-2 pb-1 mb-5 border-b-gray-500">
//           {title}
//         </li> */}
//         {subMenu?.map((sub) => {
//           const active = pathname === sub.href;
//           return (
//             <li
//               key={sub.title}
//               className={`whitespace-nowrap px-5 w-52 py-3 rounded-md ${
//                 active ? "bg-[#1E3557] text-white" : "hover:bg-zinc-100"
//               }`}
//             >
//               <Link href={sub.href} className="flex items-center gap-2">
//                 {/* <FaChevronRight className="text-xs" /> */}
//                 {sub.title}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );

//   return (
//     <li className={`relative ${!open && hasSubMenu ? "group" : ""}`}>
//       {hasSubMenu ? renderDropdownToggle() : renderMainLink()}
//       {hasSubMenu && open && renderExpandedSubMenu()}
//       {hasSubMenu && !open && renderHoverSubMenu()}
//     </li>
//   );
// };

// export default MenuItem;

"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
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
  onClick,
}) => {
  const pathname = usePathname();
  const submenuRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState("0px");
  const [isHovered, setIsHovered] = useState(false);

  // Calculate active states
  const isActive = useMemo(() => href && pathname === href, [href, pathname]);
  const isSubActive = useMemo(
    () => subMenu?.some((item) => pathname === item.href),
    [subMenu, pathname]
  );

  // Handle submenu height animation
  useEffect(() => {
    if (expanded && submenuRef.current) {
      setHeight(`${submenuRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [expanded]);

  // Handle click events
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (hasSubMenu && open) {
        e.preventDefault();
        toggleSubMenu?.();
      }
      onClick?.();
    },
    [hasSubMenu, open, toggleSubMenu, onClick]
  );

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (hasSubMenu && open) {
          toggleSubMenu?.();
        } else if (href) {
          window.location.href = href;
        }
      }
    },
    [hasSubMenu, open, toggleSubMenu, href]
  );

  // Main link rendering
  const renderMainLink = useCallback(
    () => (
      <Link
        prefetch
        href={href || "#"}
        className={`flex items-center ${
          open ? "" : "justify-center"
        } gap-3 p-2 rounded-lg transition-all duration-300 ease-in-out ${
          isActive
            ? "bg-[#1E3557] text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-current={isActive ? "page" : undefined}
        tabIndex={0}
      >
        <span className="text-md" aria-hidden="true">
          {icon}
        </span>
        {open && <span className="text-md">{title}</span>}
      </Link>
    ),
    [href, open, isActive, icon, title, handleClick, handleKeyDown]
  );

  // Dropdown toggle rendering
  const renderDropdownToggle = useCallback(
    () => (
      <div
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
          open ? "justify-between" : "justify-center"
        } ${
          isSubActive
            ? "bg-[#1E3557]  text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-haspopup={hasSubMenu}
      >
        <div className="flex items-center gap-3 p-0.5">
          <span className="text-md" aria-hidden="true">
            {icon}
          </span>
          {open && <span className="text-md">{title}</span>}
        </div>
        {open && hasSubMenu && (
          <span
            className={`transition-transform duration-300 ${
              expanded ? "rotate-90" : ""
            }`}
            aria-hidden="true"
          >
            <FaChevronRight />
          </span>
        )}
      </div>
    ),
    [
      open,
      isSubActive,
      handleClick,
      handleKeyDown,
      expanded,
      hasSubMenu,
      icon,
      title,
    ]
  );

  // Expanded submenu rendering
  const renderExpandedSubMenu = useCallback(
    () => (
      <ul
        ref={submenuRef}
        style={{ maxHeight: height }}
        className="pl-5 mt-1 space-y-2 overflow-hidden transition-[max-height] duration-300 ease-in-out"
        role="menu"
      >
        {subMenu?.map((sub) => {
          const active = pathname === sub.href;
          return (
            <li key={sub.title} role="none">
              <Link
                prefetch
                href={sub.href}
                className={`block text-md rounded-md p-2 ${
                  active
                    ? "bg-[#1E3557] text-white"
                    : "text-[#1E3557] hover:bg-zinc-100"
                }`}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={onClick}
              >
                {sub.title}
              </Link>
            </li>
          );
        })}
      </ul>
    ),
    [subMenu, pathname, height, onClick]
  );

  // Hover submenu rendering (when sidebar is collapsed)
  const renderHoverSubMenu = useCallback(
    () => (
      <div
        className="absolute top-0 left-full ml-2.5 hidden group-hover:block z-[9999]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white border border-gray-300 border-b-none rounded-t-lg">
          <h2 className="text-lg text-blue-950 px-3 py-3 font-semibold">
            {title}
          </h2>
        </div>
        <ul
          className="bg-white max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                  active overflow-y-auto border border-gray-300 rounded-b-lg py-1 px-3 min-w-max text-md text-[#1E3557]"
          role="menu"
        >
          {subMenu?.map((sub) => {
            const active = pathname === sub.href;
            return (
              <li
                key={sub.title}
                className={`whitespace-nowrap lg:px-5 py-3 w-52 lg:py-1.5 rounded-md  ? "bg-[#1E3557] text-white" : "hover:bg-zinc-100"
                }`}
                role="none"
              >
                <Link
                  href={sub.href}
                  prefetch
                  className="flex items-center gap-2"
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={onClick}
                >
                  {sub.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ),
    [subMenu, title, pathname, onClick]
  );

  return (
    <li
      className={`relative ${!open && hasSubMenu ? "group" : ""}`}
      onMouseEnter={() => !open && hasSubMenu && setIsHovered(true)}
      onMouseLeave={() => !open && hasSubMenu && setIsHovered(false)}
      role="none"
    >
      {hasSubMenu ? renderDropdownToggle() : renderMainLink()}
      {hasSubMenu && open && renderExpandedSubMenu()}
      {hasSubMenu && !open && isHovered && renderHoverSubMenu()}
    </li>
  );
};

export default React.memo(MenuItem);
