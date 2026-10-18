import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import GoogleCallback from "@/components/account/GoogleCallback";

export const metadata: Metadata = {
  title: "Signing in | Vistaaram",
  robots: { index: false, follow: false },
};

export default function GoogleCallbackPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF6EE] min-h-screen py-16">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <GoogleCallback />
        </div>
      </main>
      <Footer />
    </>
  );
}
