// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   memo,
//   useMemo,
// } from "react";
// import { RxAvatar, RxChevronRight } from "react-icons/rx";
// import styles from "./Dropdown.module.css";

// export type DropdownItem = {
//   label: string;
//   onClick?: () => void;
//   className?: string;
//   icon?: ReactNode;
//   children?: DropdownItem[];
// };

// export type DropdownPosition =
//   | "bottom-left"
//   | "bottom-right"
//   | "top-left"
//   | "top-right"
//   | "bottom-center"
//   | "top-center";

// interface DropdownProps {
//   trigger?: ReactNode;
//   items: DropdownItem[];
//   preferredPosition?: DropdownPosition;
//   className?: string;
//   dropdownClassName?: string;
//   itemClassName?: string;
//   onOpenChange?: (isOpen: boolean) => void;
//   level?: number;
// }

// const POSITION_CLASSES = {
//   "bottom-left": styles.bottomLeft,
//   "bottom-right": styles.bottomRight,
//   "top-left": styles.topLeft,
//   "top-right": styles.topRight,
//   "bottom-center": styles.bottomCenter,
//   "top-center": styles.topCenter,
// } as const;

// const DEBOUNCE_DELAY = 100;
// // const SUBMENU_OFFSET = 8;
// const VIEWPORT_MARGIN = 16;

// const Dropdown = memo(function Dropdown({
//   trigger,
//   items,
//   preferredPosition = "bottom-left",
//   className = "",
//   dropdownClassName = styles.dropdown,
//   itemClassName = styles.item,
//   onOpenChange,
//   level = 0,
// }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
//   const [position, setPosition] = useState<DropdownPosition>(preferredPosition);

//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const itemsRef = useRef<HTMLElement[]>([]);
//   const resizeObserver = useRef<ResizeObserver | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const defaultTrigger = useMemo(
//     () => <RxAvatar className={styles.avatar} />,
//     []
//   );

//   const calculatePosition = useCallback(() => {
//     if (!buttonRef.current || !dropdownRef.current) return preferredPosition;

//     const buttonRect = buttonRef.current.getBoundingClientRect();
//     const dropdownRect = dropdownRef.current.getBoundingClientRect();
//     const viewportWidth = document.documentElement.clientWidth;
//     const viewportHeight = document.documentElement.clientHeight;

//     // Debug logs
//     console.log("Button Rect:", buttonRect);
//     console.log("Dropdown Rect:", dropdownRect);
//     console.log("Viewport (width, height):", { viewportWidth, viewportHeight });

//     const vertical =
//       buttonRect.bottom + dropdownRect.height + VIEWPORT_MARGIN > viewportHeight
//         ? "top"
//         : "bottom";

//     const horizontal = () => {
//       const spaceLeft = buttonRect.left;
//       const spaceRight = viewportWidth - buttonRect.right;
//       const canCenter =
//         spaceLeft >= dropdownRect.width / 2 &&
//         spaceRight >= dropdownRect.width / 2;

//       // For submenus, prioritize left or right based on space
//       if (level > 0) {
//         return spaceRight >= dropdownRect.width ? "left" : "right";
//       }

//       // Prioritize preferredPosition if space allows
//       if (
//         preferredPosition &&
//         preferredPosition.includes("left") &&
//         spaceLeft >= dropdownRect.width
//       ) {
//         return "left";
//       }
//       if (
//         preferredPosition &&
//         preferredPosition.includes("right") &&
//         spaceRight >= dropdownRect.width
//       ) {
//         return "right";
//       }
//       if (
//         preferredPosition &&
//         preferredPosition.includes("center") &&
//         canCenter
//       ) {
//         return "center";
//       }

//       // Fallback: choose based on available space
//       return spaceLeft >= dropdownRect.width
//         ? "left"
//         : spaceRight >= dropdownRect.width
//         ? "right"
//         : canCenter
//         ? "center"
//         : "left"; // Default to left if no position fits perfectly
//     };

//     const calculatedPosition =
//       `${vertical}-${horizontal()}` as DropdownPosition;
//     console.log("Calculated Position:", calculatedPosition);
//     return calculatedPosition;
//   }, [preferredPosition, level]);

//   const updatePosition = useCallback(() => {
//     if (isOpen) setPosition(calculatePosition());
//   }, [isOpen, calculatePosition]);

//   const debouncedUpdatePosition = useMemo(
//     () => debounce(updatePosition, DEBOUNCE_DELAY),
//     [updatePosition]
//   );

//   const toggleDropdown = useCallback(() => {
//     setIsOpen((prev) => {
//       const newState = !prev;
//       onOpenChange?.(newState);
//       return newState;
//     });
//   }, [onOpenChange]);

//   const handleItemHover = useCallback((index: number | null) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setActiveSubIndex(index);
//     }, 150);
//   }, []);

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (!isOpen) return;

//       const items = itemsRef.current;
//       const focusedIndex = items.findIndex(
//         (item) => item === document.activeElement
//       );

//       switch (e.key) {
//         case "Escape":
//           setIsOpen(false);
//           buttonRef.current?.focus();
//           break;
//         case "ArrowDown":
//           e.preventDefault();
//           items[Math.min(focusedIndex + 1, items.length - 1)]?.focus();
//           break;
//         case "ArrowUp":
//           e.preventDefault();
//           items[Math.max(focusedIndex - 1, 0)]?.focus();
//           break;
//         case "ArrowRight":
//           e.preventDefault();
//           if (activeSubIndex !== null)
//             items[activeSubIndex]?.querySelector("button")?.focus();
//           break;
//       }
//     },
//     [isOpen, activeSubIndex]
//   );

//   useEffect(() => {
//     if (isOpen) {
//       updatePosition();
//       resizeObserver.current = new ResizeObserver(debouncedUpdatePosition);
//       if (dropdownRef.current)
//         resizeObserver.current.observe(dropdownRef.current);
//       document.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       resizeObserver.current?.disconnect();
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen, handleKeyDown, debouncedUpdatePosition, updatePosition]);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div ref={dropdownRef} className={`${styles.container} ${className}`}>
//       <button
//         ref={buttonRef}
//         type="button"
//         onClick={toggleDropdown}
//         aria-haspopup="menu"
//         aria-expanded={isOpen}
//         className={`${styles.trigger} min-w-[24px] min-h-[24px] flex items-center justify-center`}
//       >
//         {trigger || defaultTrigger}
//       </button>

//       <div
//         className={`${styles.menu} ${POSITION_CLASSES[position]} ${
//           isOpen ? styles.visible : styles.hidden
//         } ${dropdownClassName}`}
//         role="menu"
//       >
//         {items.map((item, index) => (
//           <DropdownItem
//             key={`${item.label}-${index}`}
//             item={item}
//             index={index}
//             isActive={activeSubIndex === index}
//             level={level}
//             position={position}
//             itemClassName={itemClassName}
//             onHover={handleItemHover}
//             onClose={() => setActiveSubIndex(null)}
//             itemsRef={itemsRef}
//           />
//         ))}
//       </div>
//     </div>
//   );
// });

// const DropdownItem = memo(
//   ({
//     item,
//     index,
//     isActive,
//     level,
//     position,
//     itemClassName,
//     onHover,
//     onClose,
//     itemsRef,
//   }: {
//     item: DropdownItem;
//     index: number;
//     isActive: boolean;
//     level: number;
//     position: DropdownPosition;
//     itemClassName: string;
//     onHover: (index: number | null) => void;
//     onClose: () => void;
//     itemsRef: React.MutableRefObject<HTMLElement[]>;
//   }) => {
//     const itemRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//       if (itemRef.current) {
//         itemsRef.current[index] = itemRef.current;
//       }
//       return () => {
//         itemsRef.current[index] = null as any;
//       };
//     }, [index, itemsRef]);

//     const handleClick = useCallback(() => {
//       if (!item.children) {
//         item.onClick?.();
//         onClose();
//       }
//     }, [item, onClose]);

//     const submenuPosition = useMemo(
//       () =>
//         level === 0
//           ? position
//           : position.includes("right")
//           ? ("bottom-left" as DropdownPosition)
//           : ("bottom-right" as DropdownPosition),
//       [level, position]
//     );

//     return (
//       <div
//         ref={itemRef}
//         className={styles.itemWrapper}
//         onMouseEnter={() => onHover(index)}
//         onMouseLeave={onClose}
//       >
//         <div
//           role="menuitem"
//           tabIndex={0}
//           onClick={handleClick}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleClick();
//           }}
//           className={`${styles.item} ${itemClassName} ${
//             item.children ? styles.hasChildren : ""
//           } ${item.className || ""}`}
//         >
//           <div className={styles.itemContent}>
//             {item.icon && <span className={styles.icon}>{item.icon}</span>}
//             <span className={styles.label}>{item.label}</span>
//           </div>
//           {item.children && <RxChevronRight className={styles.chevron} />}
//         </div>

//         {item.children && isActive && (
//           <div
//             className={`${styles.submenuWrapper} ${
//               submenuPosition.includes("right")
//                 ? "left-full ml-1.5"
//                 : "right-full mr-1.5"
//             }`}
//           >
//             <Dropdown
//               items={item.children}
//               preferredPosition={submenuPosition}
//               level={level + 1}
//               dropdownClassName={styles.submenu}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// DropdownItem.displayName = "DropdownItem";

// function debounce<T extends (...args: any[]) => void>(
//   fn: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => fn(...args), delay);
//   };
// }

// Dropdown.displayName = "Dropdown";
// export default Dropdown;
