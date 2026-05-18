import { Plans } from "./plans";
import { PremiumFAQ } from "./premium-faq";
import { PremiumFeatures } from "./premium-features";
import { PremiumHero } from "./premium-hero";
import { TrustedCompanies } from "./trusted-companies";

export const PremiumPage = () => (
  <div className="mx-auto px-4 my-4 mr-4 rounded-2xl bg-white dark:bg-black py-8 sm:px-8 shadow-card">
    <PremiumHero />
    <PremiumFeatures />
    <Plans />
    <TrustedCompanies />
    <PremiumFAQ />
  </div>
);
