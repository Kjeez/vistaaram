import { Metadata } from "next";
import PolicyPage from "@/components/sections/policy/PolicyPage";
import { termsContent } from "@/data/content";

export const metadata: Metadata = {
  title: termsContent.metaTitle,
  description: termsContent.metaDescription,
};

export default function TermsPage() {
  return <PolicyPage content={termsContent} currentHref="/terms" />;
}
