import { style } from "@vanilla-extract/css";

export const shapeSelect = style({
    position: "relative",
    backgroundColor: "#FED766",
    width: "100%",           // Let the grid container determine width
    aspectRatio: "1 / 1",    // Keep it square
    borderRadius: "10%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    minWidth: "60px",        // Absolute minimum before it looks bad
});

export const label = style({
    marginTop: "5%",
    fontSize: "1rem",        // Use rem for consistent text size
    color: "#333",
    fontWeight: "bold",
    textTransform: "capitalize",
});

export const active = style({
    backgroundColor: "#DFA801",
    border: "2px solid #8D6A01",
});