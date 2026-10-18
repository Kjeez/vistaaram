import OrderDetailPage from "@/components/account/OrderDetailPage";

export default async function AccountOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailPage orderId={id} />;
}
