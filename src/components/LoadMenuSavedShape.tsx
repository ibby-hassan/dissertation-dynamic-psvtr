import {
  cardContainer, selected, thumbnail, infoSection,
  shapeName, timestamp, deleteButton, editButton, downloadButton
} from "./styles/LoadMenuSavedShape.css.ts";
import { type SaveObject, downloadToPC } from "../utils/ioUtils";

import editIcon from "../assets/edit.png";
import downloadIcon from "../assets/save.png"; // Using save.png as requested

interface LoadMenuSavedShapeProps {
  data: SaveObject;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: () => void;
}

const LoadMenuSavedShape = ({ data, isSelected, onClick, onDelete, onRename }: LoadMenuSavedShapeProps) => {
  const dateObj = new Date(data.date);
  const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`${cardContainer} ${isSelected ? selected : ''}`} onClick={onClick}>
      <div className={downloadButton} onClick={(e) => {e.stopPropagation(); downloadToPC(data.image, data.name); }} title="Download to PC">
        <img src={downloadIcon} alt="Download" style={{ width: '60%', height: '60%', filter: 'brightness(0) invert(1)' }} />
      </div>

      <div className={editButton} onClick={(e) => { e.stopPropagation(); onRename(); }} title="Rename Shape">
        <img src={editIcon} alt="Edit" style={{ width: '60%', height: '60%', filter: 'brightness(0) invert(1)' }} />
      </div>

      <div className={deleteButton} onClick={(e) => { e.stopPropagation(); onDelete(); }} title="Delete Shape">
        ✕
      </div>

      <img src={data.image} alt={data.name} className={thumbnail} />
      <div className={infoSection}>
        <p className={shapeName} title={data.name}>{data.name}</p>
        <p className={timestamp}>{dateStr}</p>
      </div>
    </div>
  );
};

export default LoadMenuSavedShape;