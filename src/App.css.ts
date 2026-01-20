import { style } from "@vanilla-extract/css";

export const appscreen = style({
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
});

export const toolbarSection = style({
    backgroundColor: "grey",
    height: "100%",
    width: "25%",
    display: "flex",
    flexDirection: "column",
});

export const cnvsSection = style({
    height: "100%",
    width: "75%",
    display: "flex",
    flexDirection: "column",
});

export const cnvsCanvas = style({
    width: "100%",
    height: "80%",
});

export const cnvsToolbar = style({
    width: "100%",
    height: "20%",
    display: "flex",
    borderTop: "1px solid black",
});

