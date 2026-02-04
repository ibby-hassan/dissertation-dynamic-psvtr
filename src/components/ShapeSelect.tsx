import { shapeSelect, label, active } from "./styles/ShapeSelect.css.ts";
import type { SubshapeType } from "../utils/ShapeUtils.ts";

interface ShapeSelectProps {
  type: SubshapeType;
  selected: boolean;
  onClick: () => void;
}

const ShapeSelect = ({ type, selected, onClick }: ShapeSelectProps) => {

  return (
    <div className={`${shapeSelect} ${selected ? active : ''}`} onClick={onClick}>
      <p className={label}>{type}</p>
    </div>
  )
};
export default ShapeSelect;
