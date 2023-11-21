import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientContext from "./ClientContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VR-Videoportal der Universität Paderborn",
  description: "VR-Videoportal der Universität Paderborn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientContext>
          <div className="w-screen h-screen">{children}</div>
        </ClientContext>
      </body>
    </html>
  );
}
