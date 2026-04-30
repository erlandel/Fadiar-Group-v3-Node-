import type { Metadata } from "next";
import { privatePagesSeo } from "@/data/seoMetaData";

export const metadata: Metadata = privatePagesSeo.orders;

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
