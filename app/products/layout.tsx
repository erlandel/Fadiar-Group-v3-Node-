import type { Metadata } from "next";
import { publicPagesSeo } from "@/data/seoMetaData";

export const metadata: Metadata = publicPagesSeo.products;

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
