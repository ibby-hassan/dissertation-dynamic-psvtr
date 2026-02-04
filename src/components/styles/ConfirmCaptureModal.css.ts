import { style } from "@vanilla-extract/css";

export const modalOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const modalContent = style({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
});

export const modalTitle = style({
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#333",
  textAlign: "center",
});

export const imagePreview = style({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  border: "1px solid #eee",
  backgroundColor: "#f9f9f9",
});

export const buttonGroup = style({
  display: "flex",
  gap: "10px",
  marginTop: "10px",
});

export const baseButton = style({
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  transition: "opacity 0.2s",
  ':hover': {
    opacity: 0.8,
  }
});

export const confirmButton = style([baseButton, {
  backgroundColor: "#009FB7",
  color: "white",
}]);

export const cancelButton = style([baseButton, {
  backgroundColor: "#e0e0e0",
  color: "#333",
}]);