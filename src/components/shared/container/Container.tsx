// "use client";

// import React, { ReactNode } from "react";

// interface ContainerProps {
//   children: ReactNode;
//   maxWidth?: string;
//   padding?: string;
//   className?: string;
//   mainClassName?: string;
// }

// const Container: React.FC<ContainerProps> = ({
//   children,
//   maxWidth = "max-w-2xl",
//   padding = "p-6",
//   className,
//   mainClassName = "bg-white rounded-md border border-gray-300 pt-2",
// }) => {
//   return (
//     <div className={`${mainClassName}`}>
//       <div className={`${maxWidth} mx-auto ${padding} ${className || ""}`}>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Container;

// "use client";

// import React, { ReactNode } from "react";
// import clsx from "clsx";

// type MaxWidthValue =
//   | "sm"
//   | "md"
//   | "lg"
//   | "xl"
//   | "2xl"
//   | "3xl"
//   | "4xl"
//   | "5xl"
//   | "6xl"
//   | "7xl"
//   | "full";

// type ResponsiveMaxWidth =
//   | MaxWidthValue
//   | Partial<Record<"sm" | "md" | "lg" | "xl" | "2xl", MaxWidthValue>>;

// interface ContainerProps {
//   children: ReactNode;
//   maxWidth?: ResponsiveMaxWidth;
//   contentMaxWidth?: ResponsiveMaxWidth;
//   padding?: string;
//   className?: string;
//   mainClassName?: string;
//   contentClassName?: string;
//   centered?: boolean;
// }

// const resolveResponsiveMaxWidth = (input?: ResponsiveMaxWidth): string => {
//   if (!input) return "";

//   if (typeof input === "string") {
//     return `max-w-${input}`;
//   }

//   return Object.entries(input)
//     .map(([breakpoint, value]) => `${breakpoint}:max-w-${value}`)
//     .join(" ");
// };

// const Container: React.FC<ContainerProps> = ({
//   children,
//   maxWidth = { sm: "md", md: "lg", lg: "5xl", xl: "6xl" },
//   contentMaxWidth = { sm: "sm", md: "md", lg: "3xl" },
//   padding = "p-4 sm:p-6 lg:p-10",
//   className = "",
//   mainClassName = "bg-white rounded-md border border-gray-300 pt-2",
//   contentClassName = "",
//   centered = true,
// }) => {
//   const outerWidthClasses = resolveResponsiveMaxWidth(maxWidth);
//   const innerWidthClasses = resolveResponsiveMaxWidth(contentMaxWidth);

//   return (
//     <div className={mainClassName}>
//       <div
//         className={clsx(
//           outerWidthClasses,
//           padding,
//           className,
//           centered && "mx-auto"
//         )}
//       >
//         <div
//           className={clsx(
//             innerWidthClasses,
//             contentClassName,
//             centered && "mx-auto"
//           )}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Container;

// "use client";

// import React, { ReactNode, memo, ElementType } from "react";
// import clsx from "clsx";

// // Define Tailwind max-width values with TypeScript enum for better type safety
// enum MaxWidth {
//   SM = "sm",
//   MD = "md",
//   LG = "lg",
//   XL = "xl",
//   XXL = "2xl",
//   XXXL = "3xl",
//   XXXXL = "4xl",
//   XXXXXL = "5xl",
//   XXXXXXL = "6xl",
//   XXXXXXXL = "7xl",
//   FULL = "full",
// }

// type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

// type ResponsiveMaxWidth = MaxWidth | Partial<Record<Breakpoint, MaxWidth>>;

// interface ContainerProps {
//   children: ReactNode;
//   maxWidth?: ResponsiveMaxWidth;
//   contentMaxWidth?: ResponsiveMaxWidth;
//   padding?: string;
//   className?: string;
//   mainClassName?: string;
//   contentClassName?: string;
//   centered?: boolean;
//   as?: ElementType;
//   [key: string]: unknown;
// }

// const resolveMaxWidthClasses = (input?: ResponsiveMaxWidth): string => {
//   if (!input) return "";

//   if (typeof input === "string") {
//     return input === MaxWidth.FULL ? "max-w-full" : `max-w-${input}`;
//   }

//   return Object.entries(input)
//     .filter(([_, value]) => value !== undefined)
//     .map(([breakpoint, value]) =>
//       value === MaxWidth.FULL
//         ? `${breakpoint}:max-w-full`
//         : `${breakpoint}:max-w-${value}`
//     )
//     .join(" ");
// };

// const Container: React.FC<ContainerProps> = memo(
//   ({
//     children,
//     maxWidth = {
//       sm: MaxWidth.MD,
//       md: MaxWidth.LG,
//       lg: MaxWidth.XXXXXL,
//       xl: MaxWidth.XXXXXXL,
//     },
//     contentMaxWidth = {
//       sm: MaxWidth.SM,
//       md: MaxWidth.MD,
//       lg: MaxWidth.XXXL,
//     },
//     padding = "px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12",
//     className = "",
//     mainClassName = "bg-white rounded-lg border border-gray-200 shadow-sm",
//     contentClassName = "",
//     centered = true,
//     as: Component = "div",
//     ...rest
//   }) => {
//     const outerWidthClasses = resolveMaxWidthClasses(maxWidth);
//     const innerWidthClasses = resolveMaxWidthClasses(contentMaxWidth);

//     return (
//       <Component className={mainClassName} {...rest}>
//         <div
//           className={clsx(
//             outerWidthClasses,
//             padding,
//             className,
//             centered && "mx-auto",
//             "w-full"
//           )}
//         >
//           <div
//             className={clsx(
//               innerWidthClasses,
//               contentClassName,
//               centered && "mx-auto",
//               "w-2xl"
//             )}
//           >
//             {children}
//           </div>
//         </div>
//       </Component>
//     );
//   }
// );

// // Add display name for better debugging
// Container.displayName = "Container";

// export default Container;

"use client";

import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  padding?: string;
  className?: string;
  mainClassName?: string;
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = "2xl",
  padding = "p-6",
  className,
  mainClassName = "bg-white rounded-md border border-gray-300 pt-2",
}) => {
  const resolvedMaxWidth = maxWidthMap[maxWidth];

  return (
    <div className={mainClassName}>
      <div
        className={`${resolvedMaxWidth} mx-auto ${padding} ${className || ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
