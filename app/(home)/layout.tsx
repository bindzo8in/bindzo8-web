import NavBar from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/smooth-scroll";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="font-inter">
        <NavBar />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
