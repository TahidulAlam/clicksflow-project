// "use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "custom";
  size?: "sm" | "md" | "lg" | "ghost";
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base = `${className} inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md`;

    const variants = {
      primary: `${className} bg-white text-[#23395d] focus:ring-0 border border-gray-300 hover:shadow-md cursor-pointer`,
      secondary: `${className} bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 focus:ring-0 hover:shadow-md cursor-pointer`,
      ghost: `${className} bg-gray-100 text-gray-700 border border-gray-300 hover:bg-blue-100 focus:ring-0 hover:shadow-md cursor-pointer`,
      custom: `${className} cursor-pointer`,
    };

    const sizes = {
      sm: "text-xs px-3 py-1",
      md: "text-sm px-4 py-0.5",
      lg: "text-base px-5 py-[8px]",
      ghost: "text-sm px-2 py-1",
    };

    const combinedClass = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      icon || isLoading ? "gap-2" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClass}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            <span className="">{children}</span>
          </>
        )}
      </button>
    );
  }
);

PrimaryBtn.displayName = "Button";

export default PrimaryBtn;

// "use client";

// import React, { forwardRef } from "react";
// import { FaSpinner } from "react-icons/fa";
// import clsx from "clsx"; // Optional: use clsx or tailwind-merge
// import type { ButtonHTMLAttributes, ReactNode, ElementType } from "react";

// // ---- Type Definitions ---- //
// type Variant = "primary" | "secondary" | "ghost";
// type Size = "sm" | "md" | "lg";
// type IconPosition = "left" | "right";

// export interface PrimaryBtnProps
//   extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: Variant;
//   size?: Size;
//   icon?: ElementType;
//   iconPosition?: IconPosition;
//   fullWidth?: boolean;
//   isLoading?: boolean;
//   loadingText?: string;
//   children?: ReactNode;
// }

// const PrimaryBtn = forwardRef<HTMLButtonElement, PrimaryBtnProps>(
//   (
//     {
//       children,
//       variant = "primary",
//       size = "md",
//       icon: Icon,
//       iconPosition = "left",
//       fullWidth = false,
//       isLoading = false,
//       loadingText,
//       disabled,
//       className = "",
//       type = "button",
//       ...props
//     },
//     ref
//   ) => {
//     // ---- Style Maps ---- //
//     const variantClasses: Record<Variant, string> = {
//       primary:
//         "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 border border-transparent",
//       secondary:
//         "bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-400 border border-gray-300",
//       ghost:
//         "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400 border border-transparent",
//     };

//     const sizeClasses: Record<Size, string> = {
//       sm: "text-sm px-3 py-1.5 gap-1.5",
//       md: "text-base px-4 py-2 gap-2",
//       lg: "text-lg px-6 py-3 gap-3",
//     };

//     const finalClass = clsx(
//       "inline-flex items-center justify-center rounded-md font-medium transition-all",
//       "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
//       "disabled:opacity-60 disabled:cursor-not-allowed",
//       variantClasses[variant],
//       sizeClasses[size],
//       fullWidth && "w-full",
//       isLoading && "cursor-wait",
//       className
//     );

//     return (
//       <button
//         ref={ref}
//         type={type}
//         className={finalClass}
//         disabled={disabled || isLoading}
//         aria-disabled={disabled || isLoading}
//         {...props}
//       >
//         {isLoading ? (
//           <>
//             <FaSpinner className="animate-spin h-5 w-5 mr-2" />
//             {loadingText ?? "Loading..."}
//           </>
//         ) : (
//           <>
//             {Icon && iconPosition === "left" && (
//               <Icon className="shrink-0 h-4 w-4 mr-2" aria-hidden="true" />
//             )}
//             <span className="truncate">{children}</span>
//             {Icon && iconPosition === "right" && (
//               <Icon className="shrink-0 h-4 w-4 ml-2" aria-hidden="true" />
//             )}
//           </>
//         )}
//       </button>
//     );
//   }
// );

// PrimaryBtn.displayName = "PrimaryBtn";
// export default PrimaryBtn;
