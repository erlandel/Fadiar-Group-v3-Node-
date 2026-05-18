import BannerPot from "@/components/banner/bannerPot";
import SectionMoreproducts from "@/sections/home/sectionMoreproducts";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";
import { seoMetaData } from "@/data/seoMetaData";

export function generateMetadata(): Metadata {
  return seoMetaData["/"];
}


export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-white">
        <div>
          <BannerPot />
        </div>

        <HomeClient />

        <div>
          <SectionMoreproducts />
        </div>
        
      </div>
    </>
  );
}
