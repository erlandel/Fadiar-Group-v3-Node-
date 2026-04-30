import type { Metadata } from "next";
import { privatePagesSeo } from "@/data/seoMetaData";

export const metadata: Metadata = privatePagesSeo.cart1;

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
