// import Image from "next/image";
// import React from "react";

// const SideBarLogo = ({
//   open,
// }: // userType,
// {
//   open: boolean;
//   userType: string;
// }) => {
//   return (
//     <div className="flex items-center gap-x-4">
//       <Image
//         src="/smlogo.png"
//         alt="logo"
//         width={40}
//         height={40}
//         className={`w-10 h-10 object-cover transition-all duration-300 ${
//           open && "scale-0"
//         }`}
//       />
//       {/* <h1
//         className={`text-blue-950 origin-left font-semibold text-xl transition-all duration-200 ${
//           !open && "scale-0"
//         }`}
//       >
//         {userType.charAt(0).toUpperCase() + userType.slice(1)} Panel
//       </h1> */}
//       <div
//         className={`text-blue-950 origin-left font-semibold text-xl transition-all duration-200 ${
//           !open && "scale-0"
//         }`}
//       >
//         <Image
//           src="/logo.png"
//           alt="logo"
//           width={150}
//           height={80}
//           className="w-60 -ml-10 h-7 object-cover transition-all duration-300"
//         />
//       </div>
//     </div>
//   );
// };

// export default SideBarLogo;

import Image from "next/image";
import React from "react";

interface SideBarLogoProps {
  open: boolean;
}

const SideBarLogo: React.FC<SideBarLogoProps> = ({ open }) => {
  return (
    <div className="flex items-center gap-x-4">
      {/* Small Icon Logo (always shown) */}
      <Image
        src="/smlogo.png"
        alt="Small Logo"
        width={40}
        height={40}
        className={`w-10 h-10 object-cover transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Text or Full Logo (shown only when sidebar is open) */}
      <div
        className={`transition-all duration-300 origin-left ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Option 1: Logo Image */}
        <Image
          src="/logo.png"
          alt="Main Logo"
          width={150}
          height={80}
          className="w-60 -ml-10 h-7 object-cover"
        />

        {/* Option 2: Text Logo — Uncomment if you prefer text instead of image */}
        {/* <h1 className="text-blue-950 font-semibold text-xl">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Panel
        </h1> */}
      </div>
    </div>
  );
};

export default SideBarLogo;
