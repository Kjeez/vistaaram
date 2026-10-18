import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Vistaaram",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF6EE] min-h-screen py-10 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <CheckoutClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
