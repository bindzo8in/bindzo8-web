import type { Metadata } from "next";
import { Geist, Geist_Mono, Kumbh_Sans, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/session-provider";
import FixedQuoteButton from "@/components/contact-button";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import QuoteModal from "@/components/contact-model";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/components/seo/Schemas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kumbh',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bindzo8.com';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Bindzo 8';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: "At Bindzo 8, we provide comprehensive digital marketing solutions, including SEO, social media marketing, website development, and programmatic advertising, to help businesses thrive in the digital landscape.",
  keywords: ["Website Development", "Branding", "Digital Marketing", "Mobile App Development", "Enterprise Software", "Cloud Services", "Graphic Design", "QA/Testing"],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: COMPANY_NAME,
    description: "Empowering businesses through cutting-edge technology and digital excellence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: "Empowering businesses through cutting-edge technology and digital excellence.",
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
    images: ["/nav_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kumbhSans.variable} ${raleway.variable} h-full antialiased `}
      suppressHydrationWarning
      
    >
      <head>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getLocalBusinessSchema()} />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          {/* <FixedQuoteButton /> */}
          <QuoteModal />
          <FloatingWhatsApp
            phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!}
          />
          <Toaster expand richColors position="top-right"/>
        </AuthProvider>
      </body>
    </html>
  );
}
