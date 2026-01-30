import { style } from "@vanilla-extract/css";

export const menuSection = style({
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    color: "#F4F4F8",
    alignItems: "center",
    height: "100%",
    overflowY: "auto",       // Allow scrolling if vertical space runs out
});

export const title = style({
    fontSize: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
});

export const sectionLabel = style({
    fontSize: "1rem",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
    textAlign: "left",
    width: "100%",
    fontWeight: "600",
    color: "#fff",
    borderBottom: "1px solid rgba(255,255,255,0.3)",
    paddingBottom: "0.2rem"
});

export const shapeGrid = style({
    display: "grid",
    width: "100%",
    // Automatically fit as many 90px columns as possible
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", 
    gap: "0.8rem",
    marginTop: "1rem",
});