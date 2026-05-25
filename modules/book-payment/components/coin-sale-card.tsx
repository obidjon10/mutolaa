"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Skeleton, Switch } from "@heroui/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/lib";
import { BiligCoinIcon, BiligCoinInactiveIcon } from "@/modules/icons";

import { useBookPurchaseData } from "../hooks";
import { setIsCoinSaleOn, setSelectedCoinSaleId } from "../store";

export const CoinSaleCard = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const { purchaseData, isLoading } = useBookPurchaseData(slug);
  const coinSales = [...(purchaseData?.coin_sales ?? [])].sort(
    (a, b) => b.discount_percentage - a.discount_percentage,
  );
  const isCoinSaleOn = useAppSelector(
    ({ bookPayment }) => bookPayment.isCoinSaleOn,
  );
  const selectedCoinSaleId = useAppSelector(
    ({ bookPayment }) => bookPayment.selectedCoinSaleId,
  );
  const coinAmount = useAppSelector(({ common }) => common.user?.coin_amount);

  const userCoins = coinAmount ?? 0;
  const canAfford = (sale: { coin_amount: string }) =>
    userCoins >= Number(sale.coin_amount);

  const selectedSale = coinSales.find((s) => s.id === selectedCoinSaleId);
  const hasDeduction = isCoinSaleOn && !!selectedSale;
  const remainingCoins = hasDeduction
    ? Math.max(0, userCoins - Number(selectedSale.coin_amount))
    : userCoins;

  // Defensive: if the user's balance drops and the currently selected sale is
  // no longer affordable, clear the selection. The user picks the sale
  // themselves — we never auto-select.
  useEffect(() => {
    if (!isCoinSaleOn || !selectedCoinSaleId) return;
    const current = coinSales.find((s) => s.id === selectedCoinSaleId);
    if (current && !canAfford(current)) {
      dispatch(setSelectedCoinSaleId(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCoinSaleOn, selectedCoinSaleId, coinSales, userCoins, dispatch]);

  return (
    <div className="bg-white dark:bg-black rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div
          className={classNames(
            "flex items-center gap-2 transition-colors",
            { "text-foreground-muted": !isCoinSaleOn },
          )}
        >
          <div className="bg-muted dark:bg-muted-dark rounded-xl size-11 flex items-center justify-center">
            {isCoinSaleOn ? (
              <BiligCoinIcon size={24} />
            ) : (
              <BiligCoinInactiveIcon size={24} />
            )}
          </div>
          <div>
            <h6 className="font-medium text-sm">{t("bilig_hamyon")}</h6>
            <div className="flex items-center gap-2">
              <span
                className={classNames("font-semibold", {
                  "text-foreground dark:text-white": isCoinSaleOn,
                })}
              >
                {remainingCoins.toLocaleString("ru")}
              </span>
              {hasDeduction && (
                <span className="line-through text-sm text-[#EF4444]">
                  {userCoins.toLocaleString("ru")}
                </span>
              )}
            </div>
          </div>
        </div>
        <Switch
          size="lg"
          isSelected={isCoinSaleOn}
          onChange={() => dispatch(setIsCoinSaleOn(!isCoinSaleOn))}
        >
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>

      <AnimatePresence initial={false}>
        {isCoinSaleOn && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-1">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Skeleton key={i} className="h-16 rounded-xl" />
                  ))
                : coinSales.map((sale) => {
                    const isSelected = selectedCoinSaleId === sale?.id;
                    const isAffordable = canAfford(sale);
                    return (
                      <button
                        key={sale?.id}
                        type="button"
                        disabled={!isAffordable}
                        onClick={() => dispatch(setSelectedCoinSaleId(sale?.id))}
                        className={classNames(
                          "rounded-xl px-3 py-2 transition-colors flex flex-col items-center justify-center",
                          {
                            "bg-brand text-white cursor-pointer":
                              isSelected && isAffordable,
                            "border-[1.2px] border-[#E8E8E8] dark:border-[#27272A] bg-white dark:bg-black shadow-[0_1px_3px_#00000014] dark:shadow-none cursor-pointer":
                              !isSelected && isAffordable,
                            "border-[1.2px] border-[#E8E8E8] dark:border-[#27272A] bg-muted dark:bg-muted-dark opacity-50 cursor-not-allowed":
                              !isAffordable,
                          },
                        )}
                      >
                        <span className="font-semibold text-sm">
                          {sale?.discount_percentage}%
                        </span>
                        <span
                          className={classNames("text-xs mt-0.5", {
                            "text-white/80": isSelected && isAffordable,
                            "text-foreground-muted":
                              !isSelected || !isAffordable,
                          })}
                        >
                          {Math.floor(Number(sale?.coin_amount))} {t("bilig")}
                        </span>
                      </button>
                    );
                  })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
