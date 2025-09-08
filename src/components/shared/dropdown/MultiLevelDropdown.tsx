/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { LiaAngleRightSolid } from "react-icons/lia";
import clsx from "clsx";
import throttle from "lodash/throttle";

interface DropdownItem {
  id?: string;
  labelHeader?: ReactNode;
  depthHeader?: ReactNode;
  showDepthHeader?: boolean;
  labelHeaderClass?: string;
  label?: ReactNode;
  labelClass?: string;
  content?: ReactNode;
  contentClass?: string;
  onClick?: () => void;
  children?: DropdownItem[];
}

interface MultiLevelDropdownProps {
  label?: ReactNode;
  labelHeader?: ReactNode;
  depthHeader?: ReactNode;
  depthHeaders?: ReactNode[] | ((depth: number) => ReactNode);
  showDepthHeader?: boolean;
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
  submenuIcon?: React.ElementType | ReactNode;
  submenuIconClass?: string;
  searchInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  headerClass?: string;
  contentClass?: string;
  menuOffset?: { x: number; y: number };
  transitionDuration?: number;
  maxMenuHeight?: number | string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  ariaLabel?: string;
  depthTriggerClassNames?: string[];
  renderItem?: (
    item: DropdownItem,
    handlers: {
      handleClick: (e: React.MouseEvent) => void;
      handleKeyDown: (e: React.KeyboardEvent) => void;
      isOpen: boolean;
    },
    depth: number
  ) => ReactNode;
  closeOnScroll?: boolean;
  menuContainerClass?: string;
}

const SUBMENU_POSITION_CLASSES: Record<string, string> = {
  right: "left-full",
  left: "right-full",
};

const DROPDOWN_CLASSES = {
  menu: "absolute z-[99999] bg-white border border-gray-300 rounded-md min-w-[12rem]",
  item: "w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
  header:
    "px-4 pt-2 pb-1 text-sm font-semibold text-gray-700 border-b border-gray-200",
  content: "px-4 pb-2 text-sm text-gray-600",
  search:
    "w-full px-2 py-1 text-sm border-t border-b border-gray-300 focus:outline-none focus:ring-0 bg-white",
  trigger:
    "flex items-center justify-center border border-gray-300 rounded-md px-3 py-1 text-sm font-medium text-gray-700",
};

interface DropdownItemProps {
  item: DropdownItem;
  submenuPosition: "left" | "right";
  depth: number;
  index: number;
  openPath: number[];
  showDepthHeader?: boolean;
  depthHeaders?: ReactNode[] | ((depth: number) => ReactNode);
  setOpenPath: React.Dispatch<React.SetStateAction<number[]>>;
  closeAllMenus: () => void;
  renderedHeaders: Set<number>;
  itemClassName?: string;
  submenuClassName?: string;
  labelHeaderClass?: string;
  searchInput?: boolean;
  depthSubmenuClassNames?: string[];
  depthItemSubmenuClassNames?: string[];
  closeOnItemClick?: boolean;
  submenuIcon?: React.ElementType | ReactNode;
  submenuIconClass?: string;
  searchInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  headerClass?: string;
  contentClass?: string;
  maxMenuHeight?: number | string;
  renderItem?: MultiLevelDropdownProps["renderItem"];
  depthTriggerClassNames?: string[];
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
    renderedHeaders,
    itemClassName,
    submenuClassName,
    labelHeaderClass,
    searchInput,
    showDepthHeader = false,
    depthHeaders,
    depthSubmenuClassNames,
    depthItemSubmenuClassNames,
    closeOnItemClick = true,
    submenuIcon,
    submenuIconClass,
    searchInputProps,
    headerClass,
    contentClass,
    maxMenuHeight,
    renderItem,
    depthTriggerClassNames,
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

    const updatePosition = useCallback(() => {
      if (isOpen && ref.current) {
        setSubmenuTop(calculateSubmenuPosition());
      }
    }, [isOpen, calculateSubmenuPosition]);

    const throttledUpdate = useMemo(
      () => throttle(updatePosition, 50),
      [updatePosition]
    );

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

    useEffect(() => {
      if (!isOpen) {
        renderedHeaders.delete(depth + 1);
      }
    }, [isOpen, renderedHeaders, depth]);

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
        if (!item.children) {
          e.preventDefault();
          item.onClick?.();
          if (closeOnItemClick) {
            closeAllMenus();
          }
        } else {
          e.stopPropagation();
          setOpenPath((prev) => [...prev.slice(0, depth), index]);
        }
      },
      [item, depth, index, setOpenPath, closeOnItemClick, closeAllMenus]
    );

    const renderSubmenuIcon = useCallback(() => {
      if (!item.children) return null;
      if (!submenuIcon) {
        return (
          <LiaAngleRightSolid className={clsx("ml-2", submenuIconClass)} />
        );
      }
      if (typeof submenuIcon === "function") {
        const IconComponent = submenuIcon;
        return <IconComponent className={clsx("ml-2", submenuIconClass)} />;
      }
      if (React.isValidElement<{ className?: string }>(submenuIcon)) {
        return React.cloneElement(submenuIcon, {
          className: clsx(
            "ml-2",
            submenuIconClass,
            submenuIcon.props.className
          ),
        });
      }
      return null;
    }, [submenuIcon, submenuIconClass, item.children]);

    const getDepthHeader = (currentDepth: number): ReactNode => {
      if (depthHeaders) {
        if (typeof depthHeaders === "function") {
          return depthHeaders(currentDepth);
        }
        return depthHeaders[currentDepth];
      }
      return <>{item.depthHeader || item.label}</>;
    };

    return (
      <>
        {item.labelHeader && (
          <div
            className={clsx(
              DROPDOWN_CLASSES.header,
              item.labelHeaderClass || labelHeaderClass,
              headerClass
            )}
            role="separator"
          >
            {item.labelHeader}
          </div>
        )}

        <div ref={ref} className="relative" onMouseEnter={handleMouseEnter}>
          {renderItem ? (
            renderItem(item, { handleClick, handleKeyDown, isOpen }, depth)
          ) : (
            <button
              type="button"
              className={clsx(
                DROPDOWN_CLASSES.item,
                item.labelClass,
                itemClassName,
                depthTriggerClassNames?.[depth]
              )}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              role="menuitem"
              aria-haspopup={!!item.children}
              aria-expanded={isOpen}
            >
              <span className="truncate">{item.label}</span>
              {item.children && renderSubmenuIcon()}
            </button>
          )}

          {item.content && (
            <div
              className={clsx(
                DROPDOWN_CLASSES.content,
                item.contentClass,
                contentClass
              )}
            >
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
              ...(maxMenuHeight
                ? { maxHeight: maxMenuHeight, overflowY: "auto" }
                : {}),
            }}
          >
            <div className="sticky top-0 bg-white">
              {(item.showDepthHeader ?? showDepthHeader) &&
                !renderedHeaders.has(depth + 1) && (
                  <div
                    className={clsx(DROPDOWN_CLASSES.header, headerClass)}
                    role="separator"
                  >
                    {getDepthHeader(depth + 1)}
                  </div>
                )}

              {searchInput && (
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search..."
                  className={clsx(
                    DROPDOWN_CLASSES.search,
                    searchInputProps?.className
                  )}
                  aria-label="Search menu items"
                  {...searchInputProps}
                />
              )}
            </div>

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
                  renderedHeaders={renderedHeaders}
                  itemClassName={itemClassName}
                  submenuClassName={submenuClassName}
                  labelHeaderClass={labelHeaderClass}
                  searchInput={searchInput}
                  showDepthHeader={child.showDepthHeader ?? showDepthHeader}
                  depthHeaders={depthHeaders}
                  depthSubmenuClassNames={depthSubmenuClassNames}
                  depthItemSubmenuClassNames={depthItemSubmenuClassNames}
                  closeOnItemClick={closeOnItemClick}
                  submenuIcon={submenuIcon}
                  submenuIconClass={submenuIconClass}
                  searchInputProps={searchInputProps}
                  headerClass={headerClass}
                  contentClass={contentClass}
                  maxMenuHeight={maxMenuHeight}
                  renderItem={renderItem}
                  depthTriggerClassNames={depthTriggerClassNames}
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

const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = React.memo(
  ({
    label,
    labelHeader,
    depthHeader,
    depthHeaders,
    showDepthHeader = false,
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
    submenuIcon,
    submenuIconClass,
    searchInputProps,
    headerClass,
    contentClass,
    menuOffset = { x: 0, y: 0 },
    transitionDuration,
    maxMenuHeight,
    onMenuOpen,
    onMenuClose,
    ariaLabel,
    depthTriggerClassNames,
    renderItem,
    closeOnScroll = false,
    menuContainerClass,
  }) => {
    const [open, setOpen] = useState(false);
    const [openPath, setOpenPath] = useState<number[]>([]);
    const [renderedHeaders, setRenderedHeaders] = useState<Set<number>>(
      new Set()
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(
      null
    );
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [isPositionCalculated, setIsPositionCalculated] = useState(false);

    useEffect(() => {
      const element = document.createElement("div");
      document.body.appendChild(element);
      setPortalElement(element);

      return () => {
        if (element && document.body.contains(element)) {
          document.body.removeChild(element);
        }
      };
    }, []);

    const calculateMenuPosition = useCallback(() => {
      if (!dropdownRef.current || !menuRef.current) return;

      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      if (position.includes("bottom")) {
        top = triggerRect.bottom + scrollY;
      } else if (position.includes("top")) {
        top = triggerRect.top + scrollY - menuRect.height;
      }

      if (position.includes("left")) {
        left = triggerRect.left + scrollX;
      } else if (position.includes("right")) {
        left = triggerRect.right + scrollX - menuRect.width;
      } else if (position.includes("center")) {
        left =
          triggerRect.left +
          scrollX +
          triggerRect.width / 2 -
          menuRect.width / 2;
      }

      // Apply offset
      top += menuOffset.y;
      left += menuOffset.x;

      setMenuPosition({ top, left });
      setIsPositionCalculated(true);
    }, [position, menuOffset]);

    const throttledCalculate = useMemo(
      () => throttle(calculateMenuPosition, 100),
      [calculateMenuPosition]
    );

    useEffect(() => {
      if (!open) {
        setIsPositionCalculated(false);
        return;
      }

      const frameId = requestAnimationFrame(() => {
        calculateMenuPosition();
      });

      window.addEventListener("resize", throttledCalculate);
      window.addEventListener("scroll", throttledCalculate, { passive: true });

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", throttledCalculate);
        window.removeEventListener("scroll", throttledCalculate);
        throttledCalculate.cancel();
      };
    }, [open, throttledCalculate]);

    useEffect(() => {
      if (!open) {
        setRenderedHeaders(new Set());
      }
    }, [open]);

    useEffect(() => {
      if (open) {
        onMenuOpen?.();
      } else {
        onMenuClose?.();
        setOpenPath([]);
      }
    }, [open, onMenuOpen, onMenuClose]);

    useEffect(() => {
      if (!closeOnScroll || !open) return;
      const handleScroll = () => closeAllMenus();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [open, closeOnScroll]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest(".ml-dropdown-menu")
        ) {
          closeAllMenus();
        }
      };
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    const closeAllMenus = useCallback(() => {
      setOpen(false);
      setOpenPath([]);
    }, []);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeAllMenus();
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [closeAllMenus]);

    const getTopLevelHeader = (): ReactNode => {
      if (depthHeaders) {
        if (typeof depthHeaders === "function") {
          return depthHeaders(0);
        }
        return depthHeaders[0];
      }
      return depthHeader || labelHeader;
    };

    const menuContent = (
      <div
        ref={menuRef}
        className={clsx(
          "ml-dropdown-menu",
          DROPDOWN_CLASSES.menu,
          menuClassName,
          menuContainerClass,
          transitionDuration && `transition-all duration-${transitionDuration}`,
          !isPositionCalculated && "opacity-0"
        )}
        style={{
          position: "absolute",
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          transition: isPositionCalculated ? "opacity 100ms ease-out" : "none",
          ...(maxMenuHeight
            ? { maxHeight: maxMenuHeight, overflowY: "auto" }
            : {}),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {(labelHeader || depthHeader || depthHeaders) && (
          <div
            className={clsx(
              DROPDOWN_CLASSES.header,
              labelHeaderClass,
              headerClass
            )}
            role="separator"
          >
            {getTopLevelHeader()}
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
            renderedHeaders={renderedHeaders}
            itemClassName={itemClassName}
            submenuClassName={submenuClassName}
            labelHeaderClass={labelHeaderClass}
            searchInput={searchInput}
            showDepthHeader={item.showDepthHeader ?? showDepthHeader}
            depthHeaders={depthHeaders}
            depthSubmenuClassNames={depthSubmenuClassNames}
            depthItemSubmenuClassNames={depthItemSubmenuClassNames}
            closeOnItemClick={closeOnItemClick}
            submenuIcon={submenuIcon}
            submenuIconClass={submenuIconClass}
            searchInputProps={searchInputProps}
            headerClass={headerClass}
            contentClass={contentClass}
            maxMenuHeight={maxMenuHeight}
            renderItem={renderItem}
            depthTriggerClassNames={depthTriggerClassNames}
          />
        ))}
      </div>
    );

    return (
      <div
        className={clsx("relative inline-block", className)}
        ref={dropdownRef}
        role="menu"
        aria-label={ariaLabel}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className={clsx(
            DROPDOWN_CLASSES.trigger,
            labelClass,
            triggerClassName,
            depthTriggerClassNames?.[0]
          )}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
        </button>

        {open && portalElement && createPortal(menuContent, portalElement)}
      </div>
    );
  }
);

MultiLevelDropdown.displayName = "MultiLevelDropdown";
export default MultiLevelDropdown;
