import { ReactReaderStyle } from "react-reader";

// Overrides for react-reader built-in styles to remove its chrome and
// match the pixel-perfect book frame from the design.
export const readerBaseStyles = {
  ...ReactReaderStyle,
  container: {
    ...ReactReaderStyle.container,
    overflow: "hidden",
    height: "100%",
    width: "100%",
    position: "relative" as const,
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "transparent",
    boxShadow: "none",
    transition: "all 0.3s ease",
  },
  titleArea: { ...ReactReaderStyle.titleArea, display: "none" },
  reader: {
    ...ReactReaderStyle.reader,
    top: "1.25rem",
    left: "1rem",
    bottom: "2rem",
    right: "1rem",
  },
  prev: { ...ReactReaderStyle.prev, display: "none" },
  next: { ...ReactReaderStyle.next, display: "none" },
  tocBackground: { ...ReactReaderStyle.tocBackground, display: "none" },
  tocArea: { ...ReactReaderStyle.tocArea, display: "none" },
  tocAreaButton: { ...ReactReaderStyle.tocAreaButton, display: "none" },
  tocButton: { ...ReactReaderStyle.tocButton, display: "none" },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    display: "none",
  },
  tocButtonBar: { ...ReactReaderStyle.tocButtonBar, display: "none" },
  tocButtonBarTop: { ...ReactReaderStyle.tocButtonBarTop, display: "none" },
  tocButtonBottom: { ...ReactReaderStyle.tocButtonBottom, display: "none" },
};
