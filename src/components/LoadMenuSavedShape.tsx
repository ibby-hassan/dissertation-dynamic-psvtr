import { 
  cardContainer, selected, thumbnail, infoSection, 
  shapeName, timestamp, deleteButton 
} from "./styles/LoadMenuSavedShape.css.ts";
import type { SaveObject } from "../utils/IOUtils.ts";

interface LoadMenuSavedShapeProps {
  data: SaveObject;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const LoadMenuSavedShape = ({ data, isSelected, onClick, onDelete }: LoadMenuSavedShapeProps) => {
  const dateObj = new Date(data.date);
  const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div 
      className={`${cardContainer} ${isSelected ? selected : ''}`} 
      onClick={onClick}
    >
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