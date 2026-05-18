"use client";

import { createContext, useContext } from "react";

/**
 * Provides a reference to the main scrollable element (the <main> tag in
 * MainLayout) so that child components like virtualized lists can attach
 * their scroll listeners to it instead of the window.
 */
const ScrollContainerContext = createContext<HTMLElement | null>(null);

export const ScrollContainerProvider = ScrollContainerContext.Provider;

export const useScrollContainer = () => useContext(ScrollContainerContext);
