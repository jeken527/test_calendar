import Datecomponents from "@/components/Datecomponents";
import { useState } from "react";
import "@/styles/Dateselectbutton1.css";
interface Dateselectbutton1Props {
    dateselectbutton?: string;
    id?: string;
    className?: string;
    slot_146_413?: React.ReactNode;
    slot_146_414?: React.ReactNode;
}
const Dateselectbutton1 = (props: Dateselectbutton1Props) => {
    const {
        dateselectbutton,
        id,
        className = "",
        slot_146_413,
        slot_146_414
    } = props;

    const [datestates_146_413, setDatestates_146_413] = useState("default");
    const [transitionConfig146_413, setTransitionConfig146_413] = useState({});
    const [datestates_146_414, setDatestates_146_414] = useState("today");
    const [transitionConfig146_414, setTransitionConfig146_414] = useState({});
    const transitionConfig: any = {
        "146:414_62:40_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_146_413 = () => {
        setDatestates_146_413("checked");
    };

    const mouseover_146_414 = () => {
        setDatestates_146_414("checked");
    };

    return (
        <div className={`component-146_420 ${className}`} id={id}>
            <div id="146_420" className="Pixso-symbol-146_420">
                {dateselectbutton === "default" && (
                    <div id="146_419" className="Pixso-symbol-146_419">
                        {slot_146_413 ?? (
                            <Datecomponents
                                id="146_413"
                                className="Pixso-instance-146_413"
                                datestates={datestates_146_413}
                                transitionConfig={transitionConfig146_413}
                                mouseover={mouseover_146_413}
                            ></Datecomponents>
                        )}
                    </div>
                )}
                {dateselectbutton === "today" && (
                    <div id="146_418" className="Pixso-symbol-146_418">
                        {slot_146_414 ?? (
                            <Datecomponents
                                id="146_414"
                                className="Pixso-instance-146_414"
                                datestates={datestates_146_414}
                                transitionConfig={transitionConfig146_414}
                                mouseover={mouseover_146_414}
                            ></Datecomponents>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Dateselectbutton1;
