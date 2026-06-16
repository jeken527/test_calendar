import Datecomponents from "@/components/Datecomponents";
import { useState } from "react";
import "@/styles/Dateselectbutton2.css";
interface Dateselectbutton2Props {
    dateselectnew2?: string;
    id?: string;
    className?: string;
    slot_146_536?: React.ReactNode;
    slot_146_537?: React.ReactNode;
}
const Dateselectbutton2 = (props: Dateselectbutton2Props) => {
    const {
        dateselectnew2,
        id,
        className = "",
        slot_146_536,
        slot_146_537
    } = props;

    const [datestates_146_536, setDatestates_146_536] = useState("my schedule");
    const [transitionConfig146_536, setTransitionConfig146_536] = useState({});
    const transitionConfig: any = {
        "146:536_62:40_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_146_536 = () => {
        setDatestates_146_536("checked");
    };

    return (
        <div className={`component-146_545 ${className}`} id={id}>
            <div id="146_545" className="Pixso-symbol-146_545">
                {dateselectnew2 === "my schedule" && (
                    <div id="146_544" className="Pixso-symbol-146_544">
                        {slot_146_536 ?? (
                            <Datecomponents
                                id="146_536"
                                className="Pixso-instance-146_536"
                                datestates={datestates_146_536}
                                transitionConfig={transitionConfig146_536}
                                mouseover={mouseover_146_536}
                            ></Datecomponents>
                        )}
                    </div>
                )}
                {dateselectnew2 === "holiday" && (
                    <div id="146_543" className="Pixso-symbol-146_543">
                        {slot_146_537 ?? (
                            <Datecomponents
                                id="146_537"
                                className="Pixso-instance-146_537"
                                datestates="holiday"
                            ></Datecomponents>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Dateselectbutton2;
