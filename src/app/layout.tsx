import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Find and book unique stays across Norway and beyond",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
