"use client";

import { Tabs } from "@heroui/react";

import { useListCount } from "../../";

import { FinishedBook } from "./finished-book";
import { PlanToRead } from "./plan-to-read";
import { Shelf } from "./shelf";
import { TabsHeaderItem } from "./tabs-header-item";

export function TabsWrapper() {
  const { listCount } = useListCount();

  return (
    <Tabs variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options" className="pt-10">
          <Tabs.Tab id="planToRead">
            <TabsHeaderItem
              count={listCount?.plan_to_read_count}
              title="Rejamdagi kitoblar"
            />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="finishedBook">
            <TabsHeaderItem
              count={listCount?.finished_book_count}
              title="Mutolaa qilingan kitoblar"
            />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="shelf">
            <TabsHeaderItem count={listCount?.bookshelf_count} title="Javon" />
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="planToRead">
        <PlanToRead />
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="finishedBook">
        <FinishedBook />
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="shelf">
        <Shelf />
      </Tabs.Panel>
    </Tabs>
  );
}
