import { menuSection, title, shapeGrid } from "./styles/MenuSection.css.ts";
import ShapeSelect from "./ShapeSelect";
import type { SubshapeType } from "../utils/shapeUtils";

interface MenuSectionProps {
    selectedShape: SubshapeType;
    onSelectShape: (type: SubshapeType) => void;
}

const MenuSection = ({ selectedShape, onSelectShape }: MenuSectionProps) => {
    const shapeTypes: SubshapeType[] = ['empty', 'cube', 'half', 'wedge', 'pie'];

    return (
        <div className={menuSection}>
            <h1 className={title}>PSVT:R Shape Builder</h1>
            <div className={shapeGrid}>
                {shapeTypes.map((type, index) => (
                    <ShapeSelect
                        key={index}
                        type={type}
                        selected={selectedShape === type}
                        onClick={() => onSelectShape(type)}
                    />
                ))}
            </div>
        </div>
    )
}
export default MenuSection;