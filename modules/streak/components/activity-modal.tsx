"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, Spinner } from "@heroui/react";

import { ArrowRightIcon, XMarkIcon } from "@/modules/icons";

import { useActivityDetail, useStreakCalendar } from "../hooks";

import { ActivityCards } from "./activity-cards";
import { CalendarMonth } from "./calendar-month";

export const ActivityModal: React.FC = () => {
  const t = useTranslations();
  const { activityDetail } = useActivityDetail();
  const { calendars, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useStreakCalendar();

  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root, rootMargin: "100px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Modal>
      <Button
        variant="ghost"
        className="text-sm hover:bg-transparent cursor-pointer flex font-medium underline items-center gap-0.5"
      >
        {t("toliq_korish")}
        <ArrowRightIcon />
      </Button>
      <Modal.Backdrop>
        <Modal.Container scroll="inside">
          <Modal.Dialog className="sm:max-w-120">
            <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-foreground-muted hover:bg-gray-200 dark:hover:bg-white/10">
              <XMarkIcon size={16} />
            </Modal.CloseTrigger>
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold">
                {t("faollik")}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="mt-8 text-black text-base dark:text-white p-0">
              <div ref={scrollRef} className="pb-6">
                <ActivityCards
                  isDetail
                  startDate={activityDetail?.start_date}
                  currentStreakDay={activityDetail?.streak_days}
                  coinsCount={activityDetail?.gained_coin_amount}
                  nextGoalName={activityDetail?.next_goal_badge?.name}
                />
                <div className="mt-9 space-y-8">
                  {calendars.map((calendar) => (
                    <CalendarMonth
                      key={`${calendar.year}-${calendar.month}`}
                      calendar={calendar}
                    />
                  ))}
                  {isFetchingNextPage && (
                    <div className="flex justify-center py-4">
                      <Spinner size="sm" />
                    </div>
                  )}
                  <div ref={sentinelRef} />
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
