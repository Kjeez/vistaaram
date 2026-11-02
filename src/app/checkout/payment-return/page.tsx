import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PaymentReturn from "@/components/checkout/PaymentReturn";

export const metadata: Metadata = {
  title: "Confirming payment | Vistaaram",
  robots: { index: false, follow: false },
};

export default function PaymentReturnPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF6EE] min-h-screen px-4 sm:px-6">
        <PaymentReturn />
      </main>
      <Footer />
    </>
  );
}
