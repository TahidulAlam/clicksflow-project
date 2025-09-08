/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import React, {
//   useState,
//   useRef,
//   useEffect,
//   ReactNode,
//   useCallback,
//   useMemo,
// } from "react";
// import { LiaAngleRightSolid } from "react-icons/lia";

// import clsx from "clsx";
// import { debounce } from "lodash";

// interface DropdownItem {
//   labelHeader?: ReactNode;
//   labelHeaderClass?: string;
//   label?: ReactNode;
//   labelClass?: string;
//   content?: ReactNode;
//   contentClass?: string;
//   onClick?: () => void;
//   children?: DropdownItem[];
// }

// interface MultiLevelDropdownTestProps {
//   label?: ReactNode;
//   labelHeader?: string;
//   labelHeaderClass?: string;
//   labelClass?: string;
//   menuItems: DropdownItem[];
//   position?:
//     | "bottom-left"
//     | "bottom-right"
//     | "bottom-center"
//     | "top-left"
//     | "top-right"
//     | "top-center";
//   submenuPosition?: "left" | "right";
//   className?: string;
//   triggerClassName?: string;
//   menuClassName?: string;
//   submenuClassName?: string;
//   itemClassName?: string;
//   searchInput?: boolean;
//   depthSubmenuClassNames?: string[];
//   depthItemSubmenuClassNames?: string[];
// }

// const MAIN_POSITION_CLASSES: Record<string, string> = {
//   "bottom-left": "top-full left-0 sm:left-0 sm:translate-x-0",
//   "bottom-right": "top-full right-0 sm:right-0 sm:translate-x-0",
//   "bottom-center": "top-full left-1/2 -translate-x-1/2",
//   "top-left": "bottom-full left-0 sm:left-0 sm:translate-x-0",
//   "top-right": "bottom-full right-0 sm:right-0 sm:translate-x-0",
//   "top-center": "bottom-full left-1/2 -translate-x-1/2",
// };
// const SUBMENU_POSITION_CLASSES: Record<string, string> = {
//   right: "left-full top-0",
//   left: "right-full top-0",
// };

// const DROPDOWN_CLASSES = {
//   menu: "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg",
//   item: "w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
//   header:
//     "px-4 pt-2 pb-1 text-sm font-semibold text-gray-700 border-b border-gray-200",
//   content: "px-4 pb-2 text-sm text-gray-600",
//   search:
//     "w-full px-2 py-1 text-sm border-t border-b border-gray-300 focus:outline-none focus:ring-0",
// };
// interface DropdownItemProps {
//   item: DropdownItem;
//   submenuPosition: "left" | "right";
//   depth: number;
//   index: number;
//   openPath: number[];
//   setOpenPath: React.Dispatch<React.SetStateAction<number[]>>;
//   closeAllMenus: () => void;
//   itemClassName?: string;
//   submenuClassName?: string;
//   labelHeaderClass?: string;
//   searchInput?: boolean;
//   depthSubmenuClassNames?: string[];
//   depthItemSubmenuClassNames?: string[];
// }

// const DropdownItemComponent = React.memo(
//   ({
//     item,
//     submenuPosition,
//     depth,
//     index,
//     openPath,
//     setOpenPath,
//     closeAllMenus,
//     itemClassName,
//     submenuClassName,
//     labelHeaderClass,
//     searchInput,
//     depthSubmenuClassNames,
//     depthItemSubmenuClassNames,
//   }: DropdownItemProps) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const isOpen = openPath[depth] === index;
//     const [searchTerm, setSearchTerm] = useState("");

//     const debouncedSearch = useMemo(
//       () => debounce((value: string) => setSearchTerm(value), 300),
//       []
//     );

//     const handleSearch = useCallback(
//       (e: React.ChangeEvent<HTMLInputElement>) => {
//         debouncedSearch(e.target.value);
//       },
//       [debouncedSearch]
//     );

//     const filteredChildren = useMemo(() => {
//       if (!searchInput || !item.children) return item.children;
//       return item.children.filter((child) =>
//         typeof child.label === "string"
//           ? child.label.toLowerCase().includes(searchTerm.toLowerCase())
//           : true
//       );
//     }, [item.children, searchInput, searchTerm]);

//     const handleMouseEnter = useCallback(() => {
//       if (item.children) {
//         setOpenPath((prev) => [...prev.slice(0, depth), index]);
//       }
//     }, [item.children, depth, index, setOpenPath]);

//     const handleKeyDown = useCallback(
//       (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           if (item.children) {
//             setOpenPath((prev) => [...prev.slice(0, depth), index]);
//           } else {
//             item.onClick?.();
//             closeAllMenus();
//           }
//         } else if (e.key === "ArrowRight" && item.children) {
//           setOpenPath((prev) => [...prev.slice(0, depth), index]);
//         } else if (e.key === "Escape") {
//           closeAllMenus();
//         }
//       },
//       [item.children, item.onClick, depth, index, setOpenPath, closeAllMenus]
//     );

//     return (
//       <>
//         {item.labelHeader && (
//           <div
//             className={clsx(
//               DROPDOWN_CLASSES.header,
//               item.labelHeaderClass || labelHeaderClass
//             )}
//           >
//             {item.labelHeader}
//           </div>
//         )}
//         <div ref={ref} className="relative" onMouseEnter={handleMouseEnter}>
//           <button
//             type="button"
//             className={clsx(
//               DROPDOWN_CLASSES.item,
//               item.labelClass,
//               itemClassName
//             )}
//             onClick={(e) => {
//               e.stopPropagation();
//               if (!item.children) {
//                 item.onClick?.();
//                 closeAllMenus();
//               } else {
//                 setOpenPath((prev) => [...prev.slice(0, depth), index]);
//               }
//             }}
//             onKeyDown={handleKeyDown}
//             role="menuitem"
//             aria-haspopup={!!item.children}
//             aria-expanded={isOpen}
//           >
//             <span className="truncate">{item.label}</span>
//             {item.children && <LiaAngleRightSolid className="ml-2" />}
//           </button>

//           {item.content && (
//             <div className={clsx(DROPDOWN_CLASSES.content, item.contentClass)}>
//               {item.content}
//             </div>
//           )}
//         </div>

//         {/* Independent container for children dropdowns */}
//         {item.children && isOpen && (
//           <div
//             className={clsx(
//               DROPDOWN_CLASSES.menu,
//               SUBMENU_POSITION_CLASSES[submenuPosition],
//               submenuClassName,
//               depthSubmenuClassNames?.[depth]
//             )}
//           >
//             {searchInput && (
//               <input
//                 type="text"
//                 onChange={handleSearch}
//                 placeholder="Search..."
//                 className={DROPDOWN_CLASSES.search}
//                 aria-label="Search menu items"
//               />
//             )}
//             <div className={clsx(depthItemSubmenuClassNames?.[depth])}>
//               {filteredChildren?.map((child, idx) => (
//                 <DropdownItemComponent
//                   key={`${depth}-${idx}`}
//                   item={child}
//                   submenuPosition={submenuPosition}
//                   depth={depth + 1}
//                   index={idx}
//                   openPath={openPath}
//                   setOpenPath={setOpenPath}
//                   closeAllMenus={closeAllMenus}
//                   itemClassName={itemClassName}
//                   submenuClassName={submenuClassName}
//                   labelHeaderClass={labelHeaderClass}
//                   searchInput={searchInput}
//                   depthSubmenuClassNames={depthSubmenuClassNames}
//                   depthItemSubmenuClassNames={depthItemSubmenuClassNames}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
// );

// DropdownItemComponent.displayName = "DropdownItemComponent";

// const MultiLevelDropdownTest: React.FC<MultiLevelDropdownTestProps> =
//   React.memo(
//     ({
//       label,
//       labelHeader,
//       labelHeaderClass,
//       labelClass,
//       menuItems,
//       position = "bottom-left",
//       submenuPosition = "right",
//       className,
//       triggerClassName,
//       menuClassName,
//       submenuClassName,
//       itemClassName,
//       searchInput = false,
//       depthSubmenuClassNames = [],
//       depthItemSubmenuClassNames = [],
//     }) => {
//       const [open, setOpen] = useState(false);
//       const [openPath, setOpenPath] = useState<number[]>([]);
//       const dropdownRef = useRef<HTMLDivElement>(null);

//       useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//           if (
//             dropdownRef.current &&
//             !dropdownRef.current.contains(event.target as Node)
//           ) {
//             setOpen(false);
//             setOpenPath([]);
//           }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () =>
//           document.removeEventListener("mousedown", handleClickOutside);
//       }, []);

//       const closeAllMenus = useCallback(() => {
//         setOpen(false);
//         setOpenPath([]);
//       }, []);

//       return (
//         <div
//           className={clsx("relative inline-block", className)}
//           ref={dropdownRef}
//         >
//           <button
//             type="button"
//             onClick={() => setOpen((prev) => !prev)}
//             className={clsx(
//               //   "flex items-center justify-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700",
//               labelClass,
//               triggerClassName
//             )}
//             role="button"
//             aria-haspopup="true"
//             aria-expanded={open}
//           >
//             {label}
//           </button>

//           {open && (
//             <div
//               className={clsx(
//                 DROPDOWN_CLASSES.menu,
//                 "mt-1 min-w-[12rem]",
//                 MAIN_POSITION_CLASSES[position],
//                 menuClassName
//               )}
//             >
//               {labelHeader && (
//                 <div
//                   className={clsx(DROPDOWN_CLASSES.header, labelHeaderClass)}
//                 >
//                   {labelHeader}
//                 </div>
//               )}

//               {menuItems.map((item, idx) => (
//                 <DropdownItemComponent
//                   key={idx}
//                   item={item}
//                   submenuPosition={submenuPosition}
//                   depth={0}
//                   index={idx}
//                   openPath={openPath}
//                   setOpenPath={setOpenPath}
//                   closeAllMenus={closeAllMenus}
//                   itemClassName={itemClassName}
//                   submenuClassName={submenuClassName}
//                   labelHeaderClass={labelHeaderClass}
//                   searchInput={searchInput}
//                   depthSubmenuClassNames={depthSubmenuClassNames}
//                   depthItemSubmenuClassNames={depthItemSubmenuClassNames}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }
//   );

// MultiLevelDropdownTest.displayName = "MultiLevelDropdownTest";
// export default MultiLevelDropdownTest;

"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import clsx from "clsx";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";

interface DropdownItem {
  labelHeader?: ReactNode;
  labelHeaderClass?: string;
  label?: ReactNode;
  labelClass?: string;
  content?: ReactNode;
  contentClass?: string;
  onClick?: () => void;
  children?: DropdownItem[];
}

interface MultiLevelDropdownTestProps {
  label?: ReactNode;
  labelHeader?: string;
  labelHeaderClass?: string;
  labelClass?: string;
  menuItems: DropdownItem[];
  position?:
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-left"
    | "top-right"
    | "top-center";
  submenuPosition?: "left" | "right";
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  submenuClassName?: string;
  itemClassName?: string;
  searchInput?: boolean;
  depthSubmenuClassNames?: string[];
  depthItemSubmenuClassNames?: string[];
}

const MAIN_POSITION_CLASSES: Record<string, string> = {
  "bottom-left": "top-full left-0 sm:left-0 sm:translate-x-0",
  "bottom-right": "top-full right-0 sm:right-0 sm:translate-x-0",
  "bottom-center": "top-full left-1/2 -translate-x-1/2",
  "top-left": "bottom-full left-0 sm:left-0 sm:translate-x-0",
  "top-right": "bottom-full right-0 sm:right-0 sm:translate-x-0",
  "top-center": "bottom-full left-1/2 -translate-x-1/2",
};

const SUBMENU_POSITION_CLASSES: Record<string, string> = {
  right: "left-full",
  left: "right-full",
};

const DROPDOWN_CLASSES = {
  menu: "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg",
  item: "w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
  header:
    "px-4 pt-2 pb-1 text-sm font-semibold text-gray-700 border-b border-gray-200",
  content: "px-4 pb-2 text-sm text-gray-600",
  search:
    "w-full px-2 py-1 text-sm border-t border-b border-gray-300 focus:outline-none focus:ring-0",
};

interface DropdownItemProps {
  item: DropdownItem;
  submenuPosition: "left" | "right";
  depth: number;
  index: number;
  openPath: number[];
  setOpenPath: React.Dispatch<React.SetStateAction<number[]>>;
  closeAllMenus: () => void;
  itemClassName?: string;
  submenuClassName?: string;
  labelHeaderClass?: string;
  searchInput?: boolean;
  depthSubmenuClassNames?: string[];
  depthItemSubmenuClassNames?: string[];
}

const DropdownItemComponent = React.memo(
  ({
    item,
    submenuPosition,
    depth,
    index,
    openPath,
    setOpenPath,
    closeAllMenus,
    itemClassName,
    submenuClassName,
    labelHeaderClass,
    searchInput,
    depthSubmenuClassNames,
    depthItemSubmenuClassNames,
  }: DropdownItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isOpen = openPath[depth] === index;
    const [searchTerm, setSearchTerm] = useState("");

    const calculateSubmenuPosition = useCallback(() => {
      if (!ref.current) return 0;

      let topPosition = ref.current.offsetTop;
      let currentElement = ref.current.parentElement;

      // Account for all scrollable parent containers
      while (currentElement && currentElement !== document.body) {
        if (currentElement.scrollHeight > currentElement.clientHeight) {
          topPosition -= currentElement.scrollTop;
        }
        currentElement = currentElement.parentElement;
      }

      return topPosition;
    }, []);

    const [submenuTop, setSubmenuTop] = useState(0);

    useEffect(() => {
      if (!isOpen || !ref.current) return;

      // Calculate initial position
      setSubmenuTop(calculateSubmenuPosition());

      // Set up scroll listeners on all parent containers
      const scrollableParents: HTMLElement[] = [];
      let currentElement = ref.current.parentElement;

      while (currentElement && currentElement !== document.body) {
        if (currentElement.scrollHeight > currentElement.clientHeight) {
          scrollableParents.push(currentElement);
        }
        currentElement = currentElement.parentElement;
      }

      // Throttled scroll handler
      const handleScroll = throttle(() => {
        setSubmenuTop(calculateSubmenuPosition());
      }, 16); // ~60fps

      // Add listeners to all scrollable parents
      scrollableParents.forEach((parent) => {
        parent.addEventListener("scroll", handleScroll);
      });

      return () => {
        handleScroll.cancel();
        scrollableParents.forEach((parent) => {
          parent.removeEventListener("scroll", handleScroll);
        });
      };
    }, [isOpen, calculateSubmenuPosition]);

    const debouncedSearch = useMemo(
      () => debounce((value: string) => setSearchTerm(value), 300),
      []
    );

    useEffect(() => {
      return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
      },
      [debouncedSearch]
    );

    const filteredChildren = useMemo(() => {
      if (!searchInput || !item.children) return item.children;
      return item.children.filter((child) => {
        if (typeof child.label === "string") {
          return child.label.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
      });
    }, [item.children, searchInput, searchTerm]);

    const handleMouseEnter = useCallback(() => {
      if (item.children) {
        setOpenPath((prev) => [...prev.slice(0, depth), index]);
      }
    }, [item.children, depth, index, setOpenPath]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (item.children) {
            setOpenPath((prev) => [...prev.slice(0, depth), index]);
          } else {
            item.onClick?.();
            closeAllMenus();
          }
        } else if (e.key === "ArrowRight" && item.children) {
          setOpenPath((prev) => [...prev.slice(0, depth), index]);
        } else if (e.key === "ArrowLeft") {
          setOpenPath((prev) => [...prev.slice(0, depth)]);
        } else if (e.key === "Escape") {
          closeAllMenus();
        }
      },
      [item.children, item.onClick, depth, index, setOpenPath, closeAllMenus]
    );

    return (
      <>
        {item.labelHeader && (
          <div
            className={clsx(
              DROPDOWN_CLASSES.header,
              item.labelHeaderClass || labelHeaderClass
            )}
          >
            {item.labelHeader}
          </div>
        )}
        <div ref={ref} className="relative" onMouseEnter={handleMouseEnter}>
          <button
            type="button"
            className={clsx(
              DROPDOWN_CLASSES.item,
              item.labelClass,
              itemClassName
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!item.children) {
                item.onClick?.();
                closeAllMenus();
              } else {
                setOpenPath((prev) => [...prev.slice(0, depth), index]);
              }
            }}
            onKeyDown={handleKeyDown}
            role="menuitem"
            aria-haspopup={!!item.children}
            aria-expanded={isOpen}
          >
            <span className="truncate">{item.label}</span>
            {item.children && <LiaAngleRightSolid className="ml-2" />}
          </button>

          {item.content && (
            <div className={clsx(DROPDOWN_CLASSES.content, item.contentClass)}>
              {item.content}
            </div>
          )}
        </div>

        {/* Submenu positioned based on parent item */}
        {item.children && isOpen && (
          <div
            className={clsx(
              DROPDOWN_CLASSES.menu,
              SUBMENU_POSITION_CLASSES[submenuPosition],
              "top-0", // Base position
              submenuClassName,
              depthSubmenuClassNames?.[depth]
            )}
            style={{ top: `${submenuTop}px` }} // Dynamic position
          >
            {searchInput && (
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search..."
                className={DROPDOWN_CLASSES.search}
                aria-label="Search menu items"
              />
            )}
            <div className={clsx(depthItemSubmenuClassNames?.[depth])}>
              {filteredChildren?.map((child, idx) => (
                <DropdownItemComponent
                  key={`${depth}-${idx}`}
                  item={child}
                  submenuPosition={submenuPosition}
                  depth={depth + 1}
                  index={idx}
                  openPath={openPath}
                  setOpenPath={setOpenPath}
                  closeAllMenus={closeAllMenus}
                  itemClassName={itemClassName}
                  submenuClassName={submenuClassName}
                  labelHeaderClass={labelHeaderClass}
                  searchInput={searchInput}
                  depthSubmenuClassNames={depthSubmenuClassNames}
                  depthItemSubmenuClassNames={depthItemSubmenuClassNames}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
);

DropdownItemComponent.displayName = "DropdownItemComponent";

const MultiLevelDropdownTest: React.FC<MultiLevelDropdownTestProps> =
  React.memo(
    ({
      label,
      labelHeader,
      labelHeaderClass,
      labelClass,
      menuItems,
      position = "bottom-left",
      submenuPosition = "right",
      className,
      triggerClassName,
      menuClassName,
      submenuClassName,
      itemClassName,
      searchInput = false,
      depthSubmenuClassNames = [],
      depthItemSubmenuClassNames = [],
    }) => {
      const [open, setOpen] = useState(false);
      const [openPath, setOpenPath] = useState<number[]>([]);
      const dropdownRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
          ) {
            setOpen(false);
            setOpenPath([]);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const closeAllMenus = useCallback(() => {
        setOpen(false);
        setOpenPath([]);
      }, []);

      return (
        <div
          className={clsx("relative inline-block", className)}
          ref={dropdownRef}
        >
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={clsx(
              "flex items-center justify-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700",
              labelClass,
              triggerClassName
            )}
            role="button"
            aria-haspopup="true"
            aria-expanded={open}
          >
            {label}
          </button>

          {open && (
            <div
              className={clsx(
                DROPDOWN_CLASSES.menu,
                "mt-1 min-w-[12rem]",
                MAIN_POSITION_CLASSES[position],
                menuClassName
              )}
            >
              {labelHeader && (
                <div
                  className={clsx(DROPDOWN_CLASSES.header, labelHeaderClass)}
                >
                  {labelHeader}
                </div>
              )}

              {menuItems.map((item, idx) => (
                <DropdownItemComponent
                  key={idx}
                  item={item}
                  submenuPosition={submenuPosition}
                  depth={0}
                  index={idx}
                  openPath={openPath}
                  setOpenPath={setOpenPath}
                  closeAllMenus={closeAllMenus}
                  itemClassName={itemClassName}
                  submenuClassName={submenuClassName}
                  labelHeaderClass={labelHeaderClass}
                  searchInput={searchInput}
                  depthSubmenuClassNames={depthSubmenuClassNames}
                  depthItemSubmenuClassNames={depthItemSubmenuClassNames}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
  );

MultiLevelDropdownTest.displayName = "MultiLevelDropdownTest";
export default MultiLevelDropdownTest;
