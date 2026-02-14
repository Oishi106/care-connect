import Banner from "../component/Banner/page";
import Services from "../component/Services/page";
import FAQ from "../component/FAQ/page";
import Pricing from "../component/Pricing/page";
import AdoptionProcess from "../component/AdoptionProcess/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Services />
      <FAQ />
      <Pricing />
      <AdoptionProcess />
    </div>
  );
}
