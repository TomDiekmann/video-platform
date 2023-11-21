"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";
import useAuthToken from "@/lib/useAuthToken";
import { authAsUser } from "@/lib/auth";

const NavItems = [
  {
    name: "Channels",
    href: "/channels",
  },
];

export const TopBar = ({ syncId }: { syncId: string }) => {
  const pathname = usePathname();

  const token = useAuthToken(authAsUser);

  return (
    <div className="flex flex-none flex-row gap-8 items-center w-full py-4 px-6 border-b">
      <Link href={`/${syncId}`}>
        <Image src={logo} width={160} height={48} alt="Logo" />
      </Link>
      {NavItems.map((item) => (
        <Link
          href={"/" + syncId + item.href}
          className={`py-1 px-2 rounded hover:bg-gray-100 ${
            pathname === item.href ? "text-primary" : ""
          }`}
          key={item.href}
        >
          <span className="text-lg font-medium">{item.name}</span>
        </Link>
      ))}
      <div className="ml-auto border rounded py-1 px-2 flex flex-row gap-2 items-center text-sm">
        <div
          className={`w-2 h-2 rounded-full ${
            syncId === "local" ? "bg-gray-600" : "bg-green-600"
          }`}
        />
        {syncId === "local" ? (
          <span>Lokale Wiedergabe</span>
        ) : (
          <span>Verbunden mit Screen {syncId}</span>
        )}
      </div>
    </div>
  );
};
