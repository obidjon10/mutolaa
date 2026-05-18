import { useTranslations } from "next-intl";

import { Providers } from "./providers";

export const OneTimePayment: React.FC = () => {
  const t = useTranslations();

  return (
    <div>
      <div className="text-sm font-medium">
        {t("tolov_usulini_tanlang")} <span className="text-[#FF383C]">*</span>
      </div>
      <Providers />
    </div>
  );
};
