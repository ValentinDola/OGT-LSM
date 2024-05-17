import Plan from "@/components/sections/plan";
import BarsSection from "../../components/sections/barssection";
import HomeSection from "../../components/sections/homesection";
import Quotes from "../../components/sections/quotessection";
import ReturnsSection from "../../components/sections/returnsection";

export default function Home() {
  return (
    <div className="top-0 left-0 height-full width-full flex flex-col justify-start items-center">
      <HomeSection />
      <Quotes />
      <Plan />
      <BarsSection />
    </div>
  );
}
