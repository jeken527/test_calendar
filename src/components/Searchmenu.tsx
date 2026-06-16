import Button1components from "@/components/Button1components";
import { useState } from "react";
import "@/styles/Searchmenu.css";
interface SearchmenuProps {
    searchmenu?: string;
    id?: string;
    className?: string;
    slot_107_367?: React.ReactNode;
}
const Searchmenu = (props: SearchmenuProps) => {
    const { searchmenu, id, className = "", slot_107_367 } = props;

    const [button1state_107_367, setButton1state_107_367] = useState("default");
    const [transitionConfig107_367, setTransitionConfig107_367] = useState({});
    const transitionConfig: any = {
        "107:367_47:16_mo": {
            transition: { duration: 0, ease: [0.215, 0.61, 0.355, 1] }
        }
    };

    const mouseover_107_367 = () => {
        setButton1state_107_367("checked");
    };

    return (
        <div className={`component-107_372 ${className}`} id={id}>
            <div id="107_372" className="Pixso-symbol-107_372">
                {searchmenu === "False" && (
                    <div id="107_371" className="Pixso-symbol-107_371">
                        {slot_107_367 ?? (
                            <Button1components
                                id="107_367"
                                className="Pixso-instance-107_367"
                                button1state={button1state_107_367}
                                transitionConfig={transitionConfig107_367}
                                mouseover={mouseover_107_367}
                                slot_45_10={
                                    <p
                                        id="45_10"
                                        className="Pixso-paragraph-45_10"
                                    >
                                        {"SEARCH"}
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
export default Searchmenu;
