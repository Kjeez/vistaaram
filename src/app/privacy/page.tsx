import { Metadata } from "next";
import PolicyPage from "@/components/sections/policy/PolicyPage";
import { privacyContent } from "@/data/content";

export const metadata: Metadata = {
  title: privacyContent.metaTitle,
  description: privacyContent.metaDescription,
};

export default function PrivacyPage() {
  return <PolicyPage content={privacyContent} currentHref="/privacy" />;
}
