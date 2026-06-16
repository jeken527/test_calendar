import Button1components from "@/components/Button1components";
import { useState } from "react";
import "@/styles/Resetbutton.css";
interface ResetbuttonProps {
    resetmenu?: string;
    id?: string;
    className?: string;
    slot_143_265?: React.ReactNode;
}
const Resetbutton = (props: ResetbuttonProps) => {
    const { resetmenu, id, className = "", slot_143_265 } = props;

    const [button1state_143_265, setButton1state_143_265] = useState("default");
    const [transitionConfig143_265, setTransitionConfig143_265] = useState({});
    const transitionConfig: any = {
        "143:265_47:16_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_143_265 = () => {
        setButton1state_143_265("checked");
    };

    return (
        <div className={`component-143_270 ${className}`} id={id}>
            <div id="143_270" className="Pixso-symbol-143_270">
                {resetmenu === "default" && (
                    <div id="143_269" className="Pixso-symbol-143_269">
                        {slot_143_265 ?? (
                            <Button1components
                                id="143_265"
                                className="Pixso-instance-143_265"
                                button1state={button1state_143_265}
                                transitionConfig={transitionConfig143_265}
                                mouseover={mouseover_143_265}
                                slot_45_10={
                                    <p
                                        id="45_10"
                                        className="Pixso-paragraph-45_10"
                                    >
                                        {"RESET"}
                                    </p>
                                }
                            ></Button1components>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Resetbutton;
