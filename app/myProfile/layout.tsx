import type { Metadata } from "next";
import { privatePagesSeo } from "@/data/seoMetaData";

export const metadata: Metadata = privatePagesSeo.myProfile;

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
