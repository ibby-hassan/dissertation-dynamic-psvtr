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

// Container for the rotation arrow buttons
export const controlsContainer = style({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Let clicks pass through to the main box...
    opacity: 0,            // Hidden by default
    transition: "opacity 0.2s ease-in-out",
    selectors: {
        [`${subshapeSelect}:hover &`]: {
            opacity: 1,    // Show on hover
        }
    }
});

export const rotateButton = style({
    position: "absolute",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    pointerEvents: "auto", // ...but catch clicks on the buttons themselves
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    transition: "opacity 0.1s",
    ':hover': {
        opacity: 1
    }
});
// Button-specific positions
export const posTop = style({ top: "2px", left: "50%", transform: "translateX(-50%) rotate(180deg)" }); 
export const posBottom = style({ bottom: "2px", left: "50%", transform: "translateX(-50%)" }); // Default down
export const posLeft = style({ left: "2px", top: "50%", transform: "translateY(-50%) rotate(90deg)" });
export const posRight = style({ right: "2px", top: "50%", transform: "translateY(-50%) rotate(-90deg)" });