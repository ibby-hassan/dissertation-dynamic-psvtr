import { 
  cardContainer, selected, thumbnail, infoSection, 
  shapeName, timestamp, deleteButton, editButton 
} from "./styles/LoadMenuSavedShape.css.ts";
import type { SaveObject } from "../utils/IOUtils.ts";
import editIcon from "../assets/edit.png";

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRename();
  };

  return (
    <div 
      className={`${cardContainer} ${isSelected ? selected : ''}`} 
      onClick={onClick}
    >
      <div className={editButton} onClick={handleRenameClick} title="Rename Shape">
        <img src={editIcon} alt="Edit" style={{ width: '60%', height: '60%', filter: 'brightness(0) invert(1)' }} />
      </div>

      <div className={deleteButton} onClick={handleDeleteClick} title="Delete Shape">
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