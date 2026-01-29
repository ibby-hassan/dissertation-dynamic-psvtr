import { style } from "@vanilla-extract/css";

export const overlayContainer = style({
    position: "absolute",
    top: "2vh",
    right: "2vw",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    pointerEvents: "none", 
});

// --- GENERAL SEGMENT STYLING ---
export const menuSegment = style({
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "0.8rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    pointerEvents: "auto", 
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minWidth: "120px",
    maxWidth: "12vw",
});

export const segmentTitle = style({
    fontSize: "0.7rem",
    textTransform: "uppercase",
    color: "#888",
    fontWeight: "bold",
    marginBottom: "0.2rem",
    textAlign: "center",
    letterSpacing: "0.5px",
});

// --- SEGMENT 1: ACTION GRID ---
export const actionGrid = style({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "0.5rem",
    justifyItems: "center",
});

export const actionButton = style({
    aspectRatio: "1 / 1",
    width: "2.5vw",
    border: "1px solid #eee",
    borderRadius: "6px",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.1s",
    ':hover': {
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }
});

// Special styling for the delete button to look dangerous
export const deleteAction = style({
    ':hover': {
        backgroundColor: "#FFF0F0",
        borderColor: "#FFCDCD",
    }
});

// --- SEGMENT 2: ROTATION ROWS ---
export const rotationRow = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "32px",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)", // subtle border
});

export const rotBtn = style({
    flex: 1,
    height: "100%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)", // translucent on top of row color
    transition: "background-color 0.1s",
    ':hover': {
        backgroundColor: "rgba(255,255,255,0.5)",
    }
});

export const rotLabel = style({
    flex: "0 0 24px",
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
    fontSize: "0.8rem",
    userSelect: "none",
});

// Specific Colors (Using the same palette as SubshapeSelect)
export const rowX = style({ backgroundColor: "rgba(100, 150, 255, 0.2)" }); // Blue tint
export const rowY = style({ backgroundColor: "rgba(100, 255, 100, 0.2)" }); // Green tint
export const rowZ = style({ backgroundColor: "rgba(255, 100, 100, 0.2)" }); // Red tint

// Helper for icon rotation
export const iconCW = style({ transform: "rotate(90deg)", width: "30%", aspectRatio: "1 / 1", opacity: 0.7 });
export const iconCCW = style({ transform: "rotate(-90deg)", width: "30%", aspectRatio: "1 / 1", opacity: 0.7 });
export const iconAction = style({ width: "60%", opacity: 0.8 });