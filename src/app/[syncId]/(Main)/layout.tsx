import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import { TopBar } from "./TopBar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    syncId: string;
  };
}) {
  return (
    <div className="flex flex-col w-screen h-screen">
      <TopBar syncId={params.syncId} />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
