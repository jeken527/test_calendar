import Button1components from "@/components/Button1components";
import { useState } from "react";
import "@/styles/Editmenu.css";
interface EditmenuProps {
    editmenu?: string;
    id?: string;
    className?: string;
    slot_107_320?: React.ReactNode;
}
const Editmenu = (props: EditmenuProps) => {
    const { editmenu, id, className = "", slot_107_320 } = props;

    const [button1state_107_320, setButton1state_107_320] = useState("default");
    const [transitionConfig107_320, setTransitionConfig107_320] = useState({});
    const transitionConfig: any = {
        "107:320_47:16_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_107_320 = () => {
        setButton1state_107_320("checked");
    };

    return (
        <div className={`component-107_318 ${className}`} id={id}>
            <div id="107_318" className="Pixso-symbol-107_318">
                {editmenu === "False" && (
                    <div id="107_319" className="Pixso-symbol-107_319">
                        {slot_107_320 ?? (
                            <Button1components
                                id="107_320"
                                className="Pixso-instance-107_320"
                                button1state={button1state_107_320}
                                transitionConfig={transitionConfig107_320}
                                mouseover={mouseover_107_320}
                                slot_45_10={
                                    <p
                                        id="45_10"
                                        className="Pixso-paragraph-45_10"
                                    >
                                        {"EDIT"}
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
export default Editmenu;
