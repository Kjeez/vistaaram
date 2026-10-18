import OrdersPage from "@/components/account/OrdersPage";

export default async function AccountOrdersPage({ searchParams }: { searchParams: Promise<{ linked?: string }> }) {
  const { linked } = await searchParams;
  return <OrdersPage linked={linked === "1"} />;
}
