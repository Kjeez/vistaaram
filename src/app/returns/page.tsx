import { Metadata } from "next";
import PolicyPage from "@/components/sections/policy/PolicyPage";
import { returnsContent } from "@/data/content";

export const metadata: Metadata = {
  title: returnsContent.metaTitle,
  description: returnsContent.metaDescription,
};

export default function ReturnsPage() {
  return <PolicyPage content={returnsContent} currentHref="/returns" />;
}
