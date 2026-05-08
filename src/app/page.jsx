import Banner from "../component/Banner/page";
import FAQ from "../component/FAQ/page";
import Pricing from "../component/Pricing/page";
import AdoptionProcess from "../component/AdoptionProcess/page";
import Testimonials from "../component/Testimonials/page";
import CTABanner from "../component/CTABanner/page";
import HomeServices from "../component/HomeServices";
import StatsSection from "../component/StatsSection";
import HowItWorks from "../component/HowItWorks";
import WhyChooseUs from "../component/WhyChooseUs";
import CaregiverSpotlight from "../component/CaregiverSpotlight";
import HealthTips from "../component/HealthTips";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <StatsSection />
      <HomeServices />
      <HowItWorks />
      <WhyChooseUs />
      <CaregiverSpotlight />
      <FAQ />
      <Pricing />
      <AdoptionProcess />
      <HealthTips />
      <Testimonials />
      <CTABanner />
    </div>
  );
}
