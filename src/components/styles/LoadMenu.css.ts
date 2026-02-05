import { style } from "@vanilla-extract/css";

export const menuOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(245, 245, 250, 0.98)", // Almost opaque background
  zIndex: 2000,
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
  boxSizing: "border-box",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
  borderBottom: "1px solid #ddd",
  paddingBottom: "1rem",
});

export const title = style({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#333",
});

export const gridContainer = style({
  flex: 1,
  overflowY: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "1.5rem",
  padding: "0.5rem", // Padding for shadow / outline visibility
  alignContent: "start",
});

export const emptyState = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#888",
  fontSize: "1.2rem",
  fontStyle: "italic",
});

export const footer = style({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid #ddd",
});

export const button = style({
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "opacity 0.2s",
  ':hover': {
      opacity: 0.8,
  },
  ':disabled': {
      opacity: 0.5,
      cursor: "not-allowed",
  }
});

export const loadBtn = style([button, {
  backgroundColor: "#009FB7",
  color: "white",
}]);

export const cancelBtn = style([button, {
  backgroundColor: "#ddd",
  color: "#333",
}]);