import { style } from "@vanilla-extract/css";

export const cardContainer = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "all 0.2s ease-in-out",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  position: "relative", // Needed for absolute positioning of delete btn
  ':hover': {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  }
});

export const selected = style({
  borderColor: "#009FB7",
  boxShadow: "0 0 0 2px rgba(0, 159, 183, 0.3)",
});

export const thumbnail = style({
  width: "100%",
  aspectRatio: "16 / 9",
  objectFit: "contain",
  backgroundColor: "#f4f4f8",
  borderBottom: "1px solid #eee",
});

export const infoSection = style({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const shapeName = style({
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#333",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const timestamp = style({
  fontSize: "0.7rem",
  color: "#888",
});

// --- Delete Button Styles ---
export const deleteButton = style({
  position: "absolute",
  top: "5px",
  right: "5px",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: "#FF3333",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: "bold",
  border: "2px solid white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  opacity: 0, // Hidden by default
  transition: "opacity 0.2s, transform 0.1s",
  selectors: {
      [`${cardContainer}:hover &`]: {
          opacity: 1, // Show on parent hover
      }
  },
  ':hover': {
      transform: "scale(1.1)",
      backgroundColor: "#D00000",
  }
});