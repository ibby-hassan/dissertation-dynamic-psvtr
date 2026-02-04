import { menuSection, title, shapeGrid, sectionLabel } from "./styles/MenuSection.css.ts";
import ShapeSelect from "./ShapeSelect";
import type { SubshapeType } from "../utils/ShapeUtils.ts";

interface MenuSectionProps {
  selectedShape: SubshapeType;
  onSelectShape: (type: SubshapeType) => void;
}

const MenuSection = ({ selectedShape, onSelectShape }: MenuSectionProps) => {

  const standardShapes: SubshapeType[] = ['empty', 'cube', 'half', 'wedge', 'pie'];
  const unconventionalShapes: SubshapeType[] = ['long wedge', 'big pie'];

  return (
    <section className={menuSection}>
      <h1 className={title}>PSVT:R Shape Builder</h1>

      {/* --- STANDARD SHAPES --- */}
      <h2 className={sectionLabel}>Standard Shapes</h2>
      <div className={shapeGrid}>
        {standardShapes.map((type, index) => (
          <ShapeSelect
            key={index}
            type={type}
            selected={selectedShape === type}
            onClick={() => onSelectShape(type)}
          />
        ))}
      </div>

      {/* --- UNCONVENTIONAL SHAPES --- */}
      <h2 className={sectionLabel}>Unconventional Shapes</h2>
      <div className={shapeGrid}>
        {unconventionalShapes.map((type, index) => (
          <ShapeSelect
            key={index}
            type={type}
            selected={selectedShape === type}
            onClick={() => onSelectShape(type)}
          />
        ))}
      </div>

    </section>
  )
}
export default MenuSection;