import AcceptTransfer from "@/components/account/AcceptTransfer";

export default async function AcceptTransferPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const [{ id }, { token }] = await Promise.all([params, searchParams]);
  return <AcceptTransfer orderId={id} token={token} />;
}
