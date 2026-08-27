import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-16 lg:pb-0">
      <Navbar />
      {children}
      <Footer />
      <BottomNav />
    </div>
  );
}
