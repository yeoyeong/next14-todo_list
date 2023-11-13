"use client";
import { auth } from "@/auth";
import { CheckCircleIcon, HomeModernIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeModernIcon },
  {
    name: "TodoList",
    href: "/dashboard/todolist",
    icon: CheckCircleIcon,
  },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "py-2 pl-5 flex items-center gap-3 rounded-md font-medium text-sm hover:bg-sky-100 hover:text-blue-600",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
