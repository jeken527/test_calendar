import Datecomponents from "@/components/Datecomponents";
import { useState } from "react";
import "@/styles/Dateselectbutton.css";
interface DateselectbuttonProps {
    dateselect?: string;
    id?: string;
    className?: string;
    slot_117_118?: React.ReactNode;
}
const Dateselectbutton = (props: DateselectbuttonProps) => {
    const { dateselect, id, className = "", slot_117_118 } = props;

    const [datestates_117_118, setDatestates_117_118] = useState("default");
    const [transitionConfig117_118, setTransitionConfig117_118] = useState({});
    const transitionConfig: any = {
        "117:118_62:40_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_117_118 = () => {
        setDatestates_117_118("checked");
    };

    return (
        <div className={`component-117_124 ${className}`} id={id}>
            <div id="117_124" className="Pixso-symbol-117_124">
                {dateselect === "default" && (
                    <div id="117_123" className="Pixso-symbol-117_123">
                        {slot_117_118 ?? (
                            <Datecomponents
                                id="117_118"
                                className="Pixso-instance-117_118"
                                datestates={datestates_117_118}
                                transitionConfig={transitionConfig117_118}
                                mouseover={mouseover_117_118}
                            ></Datecomponents>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Dateselectbutton;
