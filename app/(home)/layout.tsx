import NavBar from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-inter">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
