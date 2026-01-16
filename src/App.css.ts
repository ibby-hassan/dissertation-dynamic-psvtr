import { style } from "@vanilla-extract/css";

export const appscreen = style({
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
});

export const toolbarSection = style({
    backgroundColor: "red",
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
    height: "75%",
});

export const cnvstoolbar = style({
    width: "100%",
    height: "25%",
    backgroundColor: "green",
    display: "flex",
});

