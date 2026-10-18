import { Metadata } from "next";
import PolicyPage from "@/components/sections/policy/PolicyPage";
import { shippingContent } from "@/data/content";

export const metadata: Metadata = {
  title: shippingContent.metaTitle,
  description: shippingContent.metaDescription,
};

export default function ShippingPage() {
  return <PolicyPage content={shippingContent} currentHref="/shipping" />;
}
