// "use client";
// import React, { useEffect, useState } from "react";
// import Logo from "./SideBarLogo";
// import MenuItem from "./MenuItem";
// import SidebarToggleButton from "./SidebarToggleButton";
// import { MENU_CONFIG, UserType } from "@/config/MenuConfig";
// import { IoMdClose } from "react-icons/io";

// interface SidebarProps {
//   userType: UserType;
//   isMobileOpen: boolean;
//   toggleSidebar: () => void;
//   onMobileLinkClick: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   userType,
//   isMobileOpen = false,
//   toggleSidebar,
//   onMobileLinkClick,
// }) => {
//   const [open, setOpen] = useState(true);
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     if (isMobileOpen) setOpen(true);
//   }, [isMobileOpen]);

//   const toggleSubMenu = (key?: string) => {
//     if (!key) return;
//     setExpanded((prev) => (prev[key] ? {} : { [key]: true }));
//   };

//   const menus = MENU_CONFIG[userType];
//   const widthClass = isMobileOpen
//     ? "w-[250px]"
//     : open
//     ? "w-[250px]"
//     : "w-[68px]";
//   // const widthClass = isMobileOpen ? "w-72" : open ? "w-72" : "w-18";

//   return (
//     <aside
//       className={`relative h-full bg-[#F2F7FD] transition-all duration-300 ease-in-out ${widthClass} ${
//         isMobileOpen ? "fixed inset-0 h-screen rounded-none z-50" : "rounded-xl"
//       }`}
//     >
//       <div className="lg:h-full h-screen border border-gray-300 lg:rounded-xl flex flex-col">
//         {/* Header */}
//         <div className="px-1 pt-5">
//           <div className="flex justify-between items-center">
//             <Logo open={open} />
//             <button
//               onClick={toggleSidebar}
//               className="text-blue-950 lg:hidden block"
//               aria-label="Close sidebar"
//             >
//               <IoMdClose className="text-2xl" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Menu */}
//         <div
//           className={`flex-1 px-2 mt-[20px] mx-[16px] ${
//             open ? "overflow-y-auto" : "overflow-visible"
//           } scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-gray-100`}
//         >
//           <ul className="space-y-2.5 relative lg:mb-10 ">
//             {menus?.map((menu) => (
//               <MenuItem
//                 key={menu.title}
//                 title={menu.title}
//                 icon={menu.icon}
//                 href={menu.href}
//                 hasSubMenu={!!menu.subMenu}
//                 open={open}
//                 onClick={onMobileLinkClick}
//                 toggleSubMenu={() => menu.key && toggleSubMenu(menu.key)}
//                 subMenu={menu.subMenu}
//                 expanded={menu.key ? !!expanded[menu.key] : false}
//               />
//             ))}
//           </ul>
//         </div>

//         {/* Toggle Button (desktop only) */}
//         {!isMobileOpen && (
//           <div className={`${open ? "px-5 pb-5" : "mx-6"}`}>
//             <SidebarToggleButton open={open} setOpen={setOpen} />
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Logo from "./SideBarLogo";
import MenuItem from "./MenuItem";
import SidebarToggleButton from "./SidebarToggleButton";
import { MENU_CONFIG, UserType } from "@/config/MenuConfig";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  userType: UserType;
  isMobileOpen: boolean;
  toggleSidebar: () => void;
  onMobileLinkClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userType,
  isMobileOpen = false,
  toggleSidebar,
  onMobileLinkClick,
}) => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isMobileOpen) setOpen(true);
  }, [isMobileOpen]);

  const toggleSubMenu = useCallback((key?: string) => {
    if (!key) return;
    setExpanded((prev) => (prev[key] ? {} : { [key]: true }));
  }, []);

  const menus = useMemo(() => MENU_CONFIG[userType], [userType]);

  const widthClass = useMemo(
    () => (isMobileOpen ? "w-[250px]" : open ? "w-[250px]" : "w-[68px]"),
    [isMobileOpen, open]
  );

  return (
    <aside
      className={`relative h-full bg-[#F2F7FD] transition-all duration-300 ease-in-out ${widthClass} ${
        isMobileOpen ? "fixed inset-0 h-screen rounded-none z-50" : "rounded-xl"
      }`}
      aria-label="Main navigation"
    >
      <div className="lg:h-full h-screen border border-gray-300 lg:rounded-xl flex flex-col">
        {/* Header */}
        <div className="px-1 pt-5">
          <div className="flex justify-between items-center">
            <Logo open={open} />
            <button
              onClick={toggleSidebar}
              className="text-blue-950 lg:hidden block p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Scrollable Menu */}
        <div
          className={`flex-1 lg:px-2 px-0 mt-[20px] lg:mx-[4px] mx-2.5 ${
            open ? "overflow-y-auto" : "overflow-visible"
          } scrollbar-thin scrollbar-thumb-blue-950 scrollbar-track-gray-100`}
        >
          <nav aria-label="Primary navigation">
            <ul className="space-y-2.5 relative lg:mb-10">
              {menus?.map((menu) => (
                <MenuItem
                  key={menu.key || menu.title}
                  title={menu.title}
                  icon={menu.icon}
                  href={menu.href}
                  hasSubMenu={!!menu.subMenu}
                  open={open}
                  onClick={onMobileLinkClick}
                  toggleSubMenu={() => menu.key && toggleSubMenu(menu.key)}
                  subMenu={menu.subMenu}
                  expanded={menu.key ? !!expanded[menu.key] : false}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Toggle Button (desktop only) */}
        {!isMobileOpen && (
          <div className={`${open ? "px-5 pb-5" : "mx-[22px]"}`}>
            <SidebarToggleButton open={open} setOpen={setOpen} />
          </div>
        )}
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
