// "use client";

// import React, { useEffect, useCallback, ReactNode, memo } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   size?: "sm" | "md" | "lg" | "xl";
//   showCloseIcon?: boolean;
// }

// // Static object for better memory allocation
// const SIZE_CLASSES = {
//   sm: "max-w-sm",
//   md: "max-w-lg",
//   lg: "max-w-2xl",
//   xl: "max-w-4xl",
// } as const;

// // Memoize component to prevent unnecessary re-renders
// const ModalComponent: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = "md",
//   showCloseIcon = true,
// }) => {
//   // Stable event handler with proper cleanup
//   const handleEsc = useCallback(
//     (e: KeyboardEvent) => e.key === "Escape" && onClose(),
//     [onClose]
//   );

//   // Efficient event listener management
//   useEffect(() => {
//     if (!isOpen) return;
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen, handleEsc]);

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 transition-opacity ${
//         isOpen
//           ? "opacity-100 duration-300 ease-out"
//           : "opacity-0 duration-200 ease-in pointer-events-none"
//       }`}
//     >
//       <div
//         className={`w-full mx-4 ${SIZE_CLASSES[size]} transition-all ${
//           isOpen
//             ? "translate-y-0 duration-300 ease-out"
//             : "-translate-y-10 duration-200 ease-in"
//         }`}
//       >
//         <div className="relative bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
//           <div className="flex justify-between items-center p-4 border-b border-gray-200">
//             {title && (
//               <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
//             )}
//             {showCloseIcon && (
//               <button
//                 onClick={onClose}
//                 type="button"
//                 className="text-white hover:bg-red-600 transition-colors text-2xl w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//             )}
//           </div>
//           <div className="p-4 overflow-y-auto flex-1">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const Modal = memo(ModalComponent);

"use client";

import {
  useEffect,
  useCallback,
  ReactNode,
  memo,
  MouseEvent,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
  position?: "top" | "bottom" | "left" | "right" | "center";
}

const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

const POSITION_CLASSES = {
  center: "items-center justify-center",
  top: "items-start justify-center pt-4",
  bottom: "items-end justify-center pb-4",
  left: "items-center justify-start pl-4",
  right: "items-center justify-end pr-4",
} as const;

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseIcon = true,
  closeOnBackdropClick = true,
  position = "center",
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mount/unmount with transitions
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Manage body scroll and event listeners
  useEffect(() => {
    if (isMounted) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isMounted, handleEsc]);

  // Handle click outside the modal
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === modalRef.current && isVisible) {
      onClose();
    }
  };

  // Get transform classes based on position and visibility
  const getModalTransformClasses = () => {
    if (!isVisible) {
      switch (position) {
        case "top":
          return "opacity-0 -translate-y-8";
        case "bottom":
          return "opacity-0 translate-y-8";
        case "left":
          return "opacity-0 -translate-x-8";
        case "right":
          return "opacity-0 translate-x-8";
        default:
          return "opacity-0 scale-95";
      }
    }

    switch (position) {
      case "top":
      case "bottom":
        return "opacity-100 translate-y-0";
      case "left":
      case "right":
        return "opacity-100 translate-x-0";
      default:
        return "opacity-100 scale-100";
    }
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className={`fixed inset-0 z-[1000] flex ${
        POSITION_CLASSES[position]
      } bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full ${
          SIZE_CLASSES[size]
        } transition-all duration-300 ${getModalTransformClasses()} transform-gpu`}
      >
        <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] lg:mx-auto mx-4 flex flex-col overflow-hidden">
          {/* Header */}
          {(title || showCloseIcon) && (
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              {showCloseIcon && (
                <button
                  onClick={onClose}
                  type="button"
                  className="text-white hover:bg-red-600 transition-colors text-2xl w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-4 overflow-y-auto flex-1">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export const Modal = memo(ModalComponent);

// "use client";

// import {
//   useEffect,
//   useCallback,
//   ReactNode,
//   memo,
//   MouseEvent,
//   useRef,
// } from "react";
// import { createPortal } from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   footer?: ReactNode;
//   size?: "sm" | "md" | "lg" | "xl";
//   showCloseIcon?: boolean;
//   closeOnBackdropClick?: boolean;
// }

// const SIZE_CLASSES = {
//   sm: "max-w-sm",
//   md: "max-w-lg",
//   lg: "max-w-2xl",
//   xl: "max-w-4xl",
// } as const;

// const ModalComponent = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   footer,
//   size = "md",
//   showCloseIcon = true,
//   closeOnBackdropClick = true,
// }: ModalProps) => {
//   const modalRef = useRef<HTMLDivElement>(null);

//   // Escape key handler
//   const handleEsc = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     },
//     [onClose]
//   );

//   // Focus trap: optional for full accessibility
//   useEffect(() => {
//     if (!isOpen) return;
//     document.addEventListener("keydown", handleEsc);
//     document.body.style.overflow = "hidden"; // Prevent background scroll
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = ""; // Restore scroll
//     };
//   }, [isOpen, handleEsc]);

//   // Handle click outside the modal
//   const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
//     if (closeOnBackdropClick && e.target === modalRef.current) {
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return createPortal(
//     <div
//       ref={modalRef}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby={title ? "modal-title" : undefined}
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
//     >
//       <div
//         className={`w-full mx-4 ${SIZE_CLASSES[size]} ${
//           isOpen
//             ? "translate-y-0 duration-300 ease-out"
//             : "-translate-y-10 duration-200 ease-in"
//         }`}
//       >
//         <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
//           {/* Header */}
//           {(title || showCloseIcon) && (
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               {title && (
//                 <h2
//                   id="modal-title"
//                   className="text-lg font-semibold text-gray-900"
//                 >
//                   {title}
//                 </h2>
//               )}
//               {showCloseIcon && (
//                 <button
//                   onClick={onClose}
//                   type="button"
//                   className="text-white hover:bg-red-600 transition-colors text-2xl w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
//                   aria-label="Close modal"
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Body */}
//           <div className="p-4 overflow-y-auto flex-1">{children}</div>

//           {/* Footer */}
//           {footer && (
//             <div className="p-4 border-t border-gray-200 bg-gray-50">
//               {footer}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export const Modal = memo(ModalComponent);
