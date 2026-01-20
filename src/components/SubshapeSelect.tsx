import { subshapeSelect, index, icon } from "./styles/SubshapeSelect.css.ts";

interface SubshapeSelectProps {
  indexValue: number;
}

const SubshapeSelect = ({ indexValue = -1 }: SubshapeSelectProps) => {

    return (
        <div className={subshapeSelect}>
            <p className={index}>{indexValue}</p>
            <section className={icon}>

            </section>
        </div>
    )
};
export default SubshapeSelect;