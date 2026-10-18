import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order Confirmed | Vistaaram",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="bg-[#FAF6EE] min-h-screen py-10 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <OrderConfirmation orderId={id} />
        </div>
      </main>
      <Footer />
    </>
  );
}
