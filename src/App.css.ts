import { style } from "@vanilla-extract/css";

export const appscreen = style({
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
});

export const menuSection = style({
    backgroundColor: "#E00000",
    height: "100%",
    width: "25%",
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
    backgroundColor: "#F4F4F8",
});

export const cnvsToolbar = style({
    width: "100%",
    height: "20%",
    display: "flex",
    backgroundColor: "#009FB7",
})

