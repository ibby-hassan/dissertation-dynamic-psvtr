import { style } from "@vanilla-extract/css";

export const subshapeSelect = style({
    position: "relative",
    backgroundColor: "#FED766",
    
    // Height & Width Logic
    height: "90%",       
    aspectRatio: "6/7",   
    maxWidth: "11%",      // ADDED: Prevents overlap (100% / 8 items ≈ 12%)
    
    // Safety mins
    minHeight: "70px",
    minWidth: "60px",
    
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