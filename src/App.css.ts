import { style } from "@vanilla-extract/css";

export const appscreen = style({
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    userSelect: "none",
});

export const menuSection = style({
    backgroundColor: "#FF3333",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minWidth: "150px",
    flexShrink: 0, 
});

export const cnvsSection = style({
    display: "grid",
    gridTemplateRows: "auto 1fr", // Overwritten in-line dynamically
    flex: 1, 
    height: "100%",
    minWidth: 0,
});

export const cnvsCanvas = style({
    width: "100%",
    height: "100%", // Fill the grid cell
    backgroundColor: "#F4F4F8",
    position: "relative",
    overflow: "hidden",
});

export const cnvsToolbar = style({
    width: "100%",
    height: "100%", // Fill the grid cell
    display: "flex",
    backgroundColor: "#009FB7",
    overflowX: "auto", 
    alignItems: "center", 
    justifyContent: "center",
});

// RESIZERS
export const resizerVertical = style({
    width: "10px",
    marginLeft: "-5px",
    height: "100%",
    cursor: "col-resize",
    backgroundColor: "transparent", 
    zIndex: 10,
});

export const resizerHorizontal = style({
    width: "100%",
    height: "10px", 
    marginTop: "-5px", 
    cursor: "row-resize",
    backgroundColor: "transparent",
    zIndex: 10,
});