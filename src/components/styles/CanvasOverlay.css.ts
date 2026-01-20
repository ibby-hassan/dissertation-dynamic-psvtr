import { style } from "@vanilla-extract/css";

export const overlayContainer = style({
    position: "absolute",
    top: "2vh",
    right: "2vw",
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
});

export const canvasWrapper = style({
    position: "relative",
    width: "100%",
    height: "100%",
});

export const menuItem = style({
    fontSize: "0.9rem",
    color: "#333",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "4px",
    ':hover': {
        backgroundColor: "#F4F4F8",
    }
});
