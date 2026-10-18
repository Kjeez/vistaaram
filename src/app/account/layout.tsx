import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "My Account | Vistaaram",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF6EE] min-h-screen py-10 md:py-16">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
