"use client";

import { useState } from "react";

import { MiniPlayer, useAudioTrack } from "@/modules/player";

import { AuthRequiredModal } from "./auth-required-modal";
import { ConfirmModal } from "./confirm-modal";
import { Sidebar, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from "./sidebar";

interface IProps {
  children: React.ReactNode;
  initialIsAuthenticated?: boolean;
}

export function MainLayout({ children, initialIsAuthenticated }: IProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const track = useAudioTrack();
  const hasMiniPlayer = !!track;

  return (
    <div className="flex min-h-screen bg-muted dark:bg-muted-dark">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        initialIsAuthenticated={initialIsAuthenticated}
      />

      {/* Content column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 hover:bg-gray-100"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            mutol<span className="text-orange-500">aa</span>
          </span>
        </header>

        <main
          style={{ contain: "layout" }}
          className={hasMiniPlayer ? "mb-25" : undefined}
        >
          {children}
        </main>
      </div>

      {/* MiniPlayer — mobile: full width fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 lg:hidden">
        <MiniPlayer />
      </div>

      {/* MiniPlayer — desktop: offset by animated sidebar width */}
      <div
        style={{ left: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
        className="fixed bottom-0 right-0 z-20 hidden lg:block transition-[left] duration-180 ease-out"
      >
        <MiniPlayer />
      </div>

      <AuthRequiredModal />
      <ConfirmModal />
    </div>
  );
}
