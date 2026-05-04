"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/component/Navbar/page";
import Footer from "@/component/Footer/page";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
