import { subshapeSelect, index, icon } from "./styles/SubshapeSelect.css.ts";

interface SubshapeSelectProps {
  indexValue: number;
  onClick: () => void;
}

const SubshapeSelect = ({ indexValue = -1, onClick }: SubshapeSelectProps) => {
    return (
        <div className={subshapeSelect} onClick={onClick}>
            <p className={index}>{indexValue}</p>
            <section className={icon}>
                {/* Icon logic will go here later */}
            </section>
        </div>
    )
};
export default SubshapeSelect;