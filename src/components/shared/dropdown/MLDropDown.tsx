/* eslint-disable react-hooks/exhaustive-deps */

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
import throttle from "lodash/throttle";

interface DropdownItem {
  id?: string;
  labelHeader?: ReactNode;
  depthHeader?: ReactNode;
  labelHeaderClass?: string;
  label?: ReactNode;
  labelClass?: string;
  content?: ReactNode;
  contentClass?: string;
  onClick?: () => void;
  children?: DropdownItem[];
}

interface MLDropDownProps {
  label?: ReactNode;
  labelHeader?: ReactNode;
  depthHeader?: ReactNode;
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
  closeOnItemClick?: boolean;
}

const MAIN_POSITION_CLASSES: Record<string, string> = {
  "bottom-left": "top-full left-0 ",
  "bottom-right": "top-full right-0",
  "bottom-center": "top-full left-1/2 -translate-x-1/2",
  "top-left": "bottom-full left-0 ",
  "top-right": "bottom-full right-0",
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
    "w-full px-2 py-1 text-sm border-t border-b border-gray-300 focus:outline-none focus:ring-0 bg-white",
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
  closeOnItemClick?: boolean;
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
    closeOnItemClick = true,
  }: DropdownItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isOpen = openPath[depth] === index;
    const [searchTerm, setSearchTerm] = useState("");
    const [submenuTop, setSubmenuTop] = useState(0);

    const calculateSubmenuPosition = useCallback(() => {
      if (!ref.current) return 0;

      const parentMenu = ref.current.closest(`.ml-dropdown-menu`);
      if (!parentMenu) return ref.current.offsetTop;

      const itemRect = ref.current.getBoundingClientRect();
      const menuRect = parentMenu.getBoundingClientRect();
      return itemRect.top - menuRect.top;
    }, []);

    // Position handler with throttling
    const updatePosition = useCallback(() => {
      if (isOpen && ref.current) {
        setSubmenuTop(calculateSubmenuPosition());
      }
    }, [isOpen, calculateSubmenuPosition]);

    const throttledUpdate = useMemo(
      () => throttle(updatePosition, 50),
      [updatePosition]
    );

    // Setup position tracking
    useEffect(() => {
      if (!isOpen) return;

      updatePosition();

      const resizeObserver = new ResizeObserver(throttledUpdate);
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }

      window.addEventListener("resize", throttledUpdate);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", throttledUpdate);
        throttledUpdate.cancel();
      };
    }, [isOpen, throttledUpdate]);

    // Filter children based on search
    const filteredChildren = useMemo(() => {
      if (!searchInput || !item.children) return item.children;

      return item.children.filter((child) => {
        if (typeof child.label === "string") {
          return child.label.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
      });
    }, [item.children, searchInput, searchTerm]);

    // Event handlers
    const handleMouseEnter = useCallback(() => {
      if (item.children) {
        setOpenPath((prev) => [...prev.slice(0, depth), index]);
      }
    }, [item.children, depth, index, setOpenPath]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            if (item.children) {
              setOpenPath((prev) => [...prev.slice(0, depth), index]);
            } else {
              item.onClick?.();
              if (closeOnItemClick) closeAllMenus();
            }
            break;
          case "ArrowRight":
            if (item.children) {
              setOpenPath((prev) => [...prev.slice(0, depth), index]);
            }
            break;
          case "ArrowLeft":
            setOpenPath((prev) => [...prev.slice(0, depth)]);
            break;
          case "Escape":
            closeAllMenus();
            break;
        }
      },
      [item, depth, index, setOpenPath, closeAllMenus, closeOnItemClick]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!item.children) {
          item.onClick?.();
        } else {
          setOpenPath((prev) => [...prev.slice(0, depth), index]);
        }
      },
      [item, depth, index, setOpenPath, closeOnItemClick]
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
            onClick={handleClick}
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
        {item.children && isOpen && (
          <div
            className={clsx(
              "ml-dropdown-menu",
              DROPDOWN_CLASSES.menu,
              SUBMENU_POSITION_CLASSES[submenuPosition],
              "top-0",
              submenuClassName,
              depthSubmenuClassNames?.[depth]
            )}
            style={{
              top: `${submenuTop}px`,
            }}
          >
            {/* Sticky header section with parent item's label as depth header */}
            <div className="sticky top-0 z-10 bg-white">
              <div className={clsx(DROPDOWN_CLASSES.header)}>
                {item.label} {/* Use parent item's label as depth header */}
              </div>

              {/* Search input below header */}
              {searchInput && (
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className={DROPDOWN_CLASSES.search}
                  aria-label="Search menu items"
                />
              )}
            </div>

            {/* Child items container */}
            <div className={clsx(depthItemSubmenuClassNames?.[depth])}>
              {filteredChildren?.map((child, idx) => (
                <DropdownItemComponent
                  key={child.id || `${depth}-${idx}`}
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
                  closeOnItemClick={closeOnItemClick}
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

const MLDropDown: React.FC<MLDropDownProps> = React.memo(
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
    closeOnItemClick = true,
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

    // Close on Escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeAllMenus();
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [closeAllMenus]);

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
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
        </button>

        {open && (
          <div
            className={clsx(
              "ml-dropdown-menu",
              DROPDOWN_CLASSES.menu,
              "mt-1 min-w-[12rem]",
              MAIN_POSITION_CLASSES[position],
              menuClassName
            )}
          >
            {labelHeader && (
              <div className={clsx(DROPDOWN_CLASSES.header, labelHeaderClass)}>
                {labelHeader}
              </div>
            )}

            {menuItems.map((item, idx) => (
              <DropdownItemComponent
                key={item.id || idx}
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
                closeOnItemClick={closeOnItemClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

MLDropDown.displayName = "MLDropDown";
export default MLDropDown;
