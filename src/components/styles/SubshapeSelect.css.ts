import { style } from "@vanilla-extract/css";

export const subshapeSelect = style({
    position: "relative",
    backgroundColor: "#FED766",
    height: "90%",        
    width: "100%",
    maxWidth: "11%",      
    minHeight: "70px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
});

export const infoContainer = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "5px",
    pointerEvents: "none",
    zIndex: 1,
    height: "100%",
    justifyContent: "space-between",
    padding: "2%",
});

export const index = style({
    padding: "2px 4px",
    fontSize: "1rem",
    fontWeight: "bold",
    pointerEvents: "none",
    alignSelf: "flex-start", // Align number to top left
});

export const typeLabel = style({
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#333",
    margin: 0,
});

export const rotationLabel = style({
    fontSize: "0.7rem",
    fontFamily: "monospace",
    color: "#555",
    margin: 0,
});

export const controlsContainer = style({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    opacity: 0,            
    transition: "opacity 0.2s ease-in-out",
    selectors: {
        [`${subshapeSelect}:hover &`]: {
            opacity: 1,    
        }
    }
});

export const rotateButton = style({
    position: "absolute",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    opacity: 0.8,
    transition: "transform 0.1s, opacity 0.1s",
    border: "1px solid rgba(0,0,0,0.1)",
    ':hover': {
        opacity: 1,
        zIndex: 2
    }
});

// --- Axis Colors (RGB convention) ---
export const btnX = style({ backgroundColor: "rgba(100, 150, 255, 0.9)" }); // Blue
export const btnY = style({ backgroundColor: "rgba(100, 255, 100, 0.9)" }); // Green
export const btnZ = style({ backgroundColor: "rgba(255, 100, 100, 0.9)" }); // Red

// --- Positions (3 Rows, Left/Right columns) ---
// Row 1: X
export const posXLeft = style({ top: "2px", left: "2px" });
export const posXRight = style({ top: "2px", right: "2px" });

// Row 2: Y (Centered vertically)
export const posYLeft = style({ top: "50%", left: "2px", transform: "translateY(-50%)" });
export const posYRight = style({ top: "50%", right: "2px", transform: "translateY(-50%)" });

// Row 3: Z
export const posZLeft = style({ bottom: "2px", left: "2px" });
export const posZRight = style({ bottom: "2px", right: "2px" });

// Arrow rotations inside the buttons
export const rotCW = style({ transform: "rotate(90deg)" }); // Point Right
export const rotCCW = style({ transform: "rotate(-90deg)" }); // Point Left