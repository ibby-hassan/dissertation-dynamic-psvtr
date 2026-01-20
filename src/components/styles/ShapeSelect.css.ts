import { style } from "@vanilla-extract/css";

export const shapeSelect = style({
    position: "relative",
    backgroundColor: "#FED766",
    width: "5vw",
    height: "5vw",
    borderRadius: "10%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
});

export const label = style({
    marginTop: "5%",
    fontSize: "1.0vw",
    color: "#333",
    fontWeight: "bold",
    textTransform: "capitalize",
});

export const active = style({
    backgroundColor: "#DFA801",
    border: "2px solid #8D6A01",
});