/* eslint-disable react/display-name */

"use client";

import React, {
  useState,
  useCallback,
  memo,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  ReactElement,
  useId,
} from "react";

type BoxHeaderProps = {
  children: ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  id?: string;
  collapsible?: boolean;
  className?: string;
};

type BoxContentProps = {
  children: ReactNode;
  isOpen?: boolean;
  id?: string;
  className?: string;
  contentClassName?: string;
};

type BoxAccordionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  onToggle?: (id: string, isOpen: boolean) => void;
  defaultOpen?: boolean;
  collapsible?: boolean;
};

const BoxHeaderComponent = memo(
  ({
    children,
    onToggle = () => {},
    id = "",
    collapsible = true,
    className = "",
  }: BoxHeaderProps) => {
    const handleClick = (e: React.MouseEvent) => {
      const interactiveElements = [
        "button",
        "[role='button']",
        "a",
        "input",
        "svg",
        "path",
      ];
      if ((e.target as HTMLElement).closest(interactiveElements.join(", "))) {
        return;
      }

      if (collapsible && onToggle) {
        onToggle();
      }
    };

    return (
      <div
        id={`accordion-header-${id}`}
        className={`w-full flex items-center px-4 py-3 text-left font-medium text-gray-800 rounded-t-xl ${
          collapsible ? "cursor-pointer" : "cursor-default"
        } ${className}`}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }
);

const BoxContentComponent = memo(
  ({
    children,
    isOpen = false,
    id = "",
    className = "",
    contentClassName = "",
  }: BoxContentProps) => (
    <div
      id={`accordion-content-${id}`}
      className={`grid transition-all duration-400 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      } ${className}`}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`min-h-0 overflow-hidden ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className={`px-4 py-3 text-sm text-gray-700 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )
);

const BoxAccordion = ({
  children,
  className = "",
  id: propId = "",
  onToggle,
  defaultOpen = true,
  collapsible = true,
}: BoxAccordionProps) => {
  const generatedId = useId().replace(/:/g, "");
  const id = propId || generatedId;

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    if (collapsible) {
      setIsOpen((prev) => {
        const newState = !prev;
        onToggle?.(id, newState);
        return newState;
      });
    }
  }, [id, onToggle, collapsible]);

  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const childProps = {
      onToggle: handleToggle,
      isOpen: collapsible ? isOpen : true,
      id,
      collapsible,
    };

    return cloneElement(
      child as ReactElement<BoxHeaderProps | BoxContentProps>,
      childProps
    );
  });

  return (
    <div
      className={`rounded-xl bg-white overflow-hidden border border-gray-300 ${className}`}
      data-accordion-id={id}
    >
      {renderedChildren}
    </div>
  );
};

const BoxHeader = BoxHeaderComponent;
const BoxContent = BoxContentComponent;

BoxAccordion.Header = BoxHeader;
BoxAccordion.Content = BoxContent;

export { BoxHeader, BoxContent };
export default BoxAccordion;

// "use client";

// import React, {
//   useState,
//   useCallback,
//   memo,
//   Children,
//   isValidElement,
//   cloneElement,
//   ReactNode,
//   ReactElement,
//   useId,
//   useEffect,
// } from "react";

// type BoxHeaderProps = {
//   children: ReactNode;
//   onToggle?: () => void;
//   isOpen?: boolean;
//   id?: string;
//   collapsible?: boolean;
//   className?: string;
// };

// type BoxContentProps = {
//   children: ReactNode;
//   isOpen?: boolean;
//   id?: string;
//   className?: string;
//   contentClassName?: string;
// };

// type BoxAccordionProps = {
//   children: ReactNode;
//   className?: string;
//   id?: string;
//   onToggle?: (id: string, isOpen: boolean) => void;
//   defaultOpen?: boolean;
//   collapsible?: boolean;
// };

// const BoxHeaderComponent = memo((props: BoxHeaderProps) => {
//   const {
//     children,
//     onToggle,
//     id = "",
//     collapsible = true,
//     className = "",
//     isOpen = false,
//   } = props;

//   const handleClick = (e: React.MouseEvent) => {
//     const interactiveSelectors = [
//       "button",
//       "[role='button']",
//       "a",
//       "input",
//       "textarea",
//       "select",
//       "label",
//       "[contenteditable='true']",
//       "svg",
//       "path",
//     ];
//     if ((e.target as HTMLElement).closest(interactiveSelectors.join(", "))) {
//       return;
//     }

//     if (!collapsible) {
//       return;
//     }

//     onToggle?.();
//   };

//   return (
//     <div
//       id={`accordion-header-${id}`}
//       onClick={handleClick}
//       aria-expanded={collapsible ? isOpen : true}
//       aria-controls={`accordion-content-${id}`}
//       tabIndex={collapsible ? 0 : undefined}
//       className={`w-full flex items-center px-4 py-3 text-left font-medium text-gray-800 rounded-t-xl ${
//         collapsible ? "cursor-pointer" : "cursor-default"
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// });
// BoxHeaderComponent.displayName = "BoxHeader";

// const BoxContentComponent = memo((props: BoxContentProps) => {
//   const {
//     children,
//     isOpen = false,
//     id = "",
//     className = "",
//     contentClassName = "",
//   } = props;

//   return (
//     <div
//       id={`accordion-content-${id}`}
//       className={`grid transition-all duration-300 ease-in-out ${
//         isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//       } ${className}`}
//       role="region"
//       aria-labelledby={`accordion-header-${id}`}
//       aria-hidden={!isOpen}
//     >
//       <div
//         className={`min-h-0 overflow-hidden ${
//           isOpen ? "visible" : "invisible"
//         }`}
//       >
//         <div className={`px-4 py-3 text-sm text-gray-700 ${contentClassName}`}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// });
// BoxContentComponent.displayName = "BoxContent";

// const BoxAccordion = ({
//   children,
//   className = "",
//   id: propId = "",
//   onToggle,
//   defaultOpen = true,
//   collapsible = true,
// }: BoxAccordionProps) => {
//   const generatedId = useId().replace(/:/g, "");
//   const id = propId || generatedId;

//   const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

//   useEffect(() => {
//     if (!collapsible) {
//       setIsOpen(true);
//     } else {
//       setIsOpen(defaultOpen);
//     }
//   }, [collapsible, defaultOpen]);

//   const handleToggle = useCallback(() => {
//     if (!collapsible) return;

//     setIsOpen((prev) => {
//       const next = !prev;
//       onToggle?.(id, next);
//       return next;
//     });
//   }, [id, onToggle, collapsible]);

//   const isHeader = (el: any) =>
//     el?.type === BoxHeaderComponent || el?.type?.displayName === "BoxHeader";
//   const isContent = (el: any) =>
//     el?.type === BoxContentComponent || el?.type?.displayName === "BoxContent";

//   const renderedChildren = Children.map(children, (child) => {
//     if (!isValidElement(child)) return child;

//     if (isHeader(child)) {
//       const headerProps: Partial<BoxHeaderProps> = {
//         id,
//         collapsible,
//         ...(collapsible ? { onToggle: handleToggle } : { onToggle: undefined }),
//         isOpen: collapsible ? isOpen : true,
//       };
//       return cloneElement(child as ReactElement<BoxHeaderProps>, headerProps);
//     }

//     if (isContent(child)) {
//       const contentProps: Partial<BoxContentProps> = {
//         id,
//         isOpen: collapsible ? isOpen : true,
//       };
//       return cloneElement(child as ReactElement<BoxContentProps>, contentProps);
//     }

//     return child;
//   });

//   return (
//     <div
//       className={`rounded-xl bg-white overflow-hidden border border-gray-300 ${className}`}
//       data-accordion-id={id}
//     >
//       {renderedChildren}
//     </div>
//   );
// };

// const BoxHeader = BoxHeaderComponent;
// const BoxContent = BoxContentComponent;

// (BoxAccordion as any).Header = BoxHeader;
// (BoxAccordion as any).Content = BoxContent;

// export { BoxHeader, BoxContent };
// export default BoxAccordion;
