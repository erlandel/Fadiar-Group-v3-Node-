import type { Metadata } from "next";
import { dynamicPagesSeo } from "@/data/seoMetaData";

export const metadata: Metadata = dynamicPagesSeo.product.default;

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
