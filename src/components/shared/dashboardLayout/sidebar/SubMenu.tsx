import Link from "next/link";
import React from "react";
const SubMenu: React.FC<{ subMenu: { title: string; href: string }[] }> = ({
  subMenu,
}) => {
  return (
    <ul className="pl-3 text-blue-950">
      {subMenu.map((sub, subIndex) => (
        <li
          key={subIndex}
          className="text-sm flex items-center gap-x-2 py-2 px-2 hover:bg-zinc-100 rounded-lg"
        >
          <Link href={sub.href} className="w-full">
            {sub.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
