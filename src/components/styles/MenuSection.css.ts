import { style } from "@vanilla-extract/css";

export const menuSection = style({
    display: "flex",
    flexDirection: "column",
    paddingTop: "3%",
    color: "#F4F4F8",
    alignItems: "center"
});

export const title = style({
    fontSize: "2vw",

});

export const shapeGrid = style({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1vw",
    marginTop: "5%",
});