import { style } from "@vanilla-extract/css";

export const subshapeSelect = style({
    position: "relative",
    backgroundColor: "#FED766",
    height: "90%",       
    width: "100%",
    maxWidth: "11%",      

    // Safety mins
    minHeight: "70px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
});

export const index = style({
    padding: "5%",
    fontSize: "1rem",
    fontWeight: "bold",
});

export const icon = style({
    width: "100%",
    height: "100%",
});