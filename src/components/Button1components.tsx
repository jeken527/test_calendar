import { withStopPropagation } from "@/utils/utils";
import "@/styles/Button1components.css";
interface Button1componentsProps {
    button1state?: string;
    id?: string;
    className?: string;
    mouseover?: (e: any) => void;
    slot_45_10?: React.ReactNode;
    slot_47_13?: React.ReactNode;
}
const Button1components = (props: Button1componentsProps) => {
    const {
        button1state,
        id,
        className = "",
        mouseover,
        slot_45_10,
        slot_47_13
    } = props;

    return (
        <div
            className={`component-47_18 ${className}`}
            id={id}
            onMouseover={withStopPropagation(mouseover)}
        >
            <div id="47_18" className="Pixso-symbol-47_18">
                {button1state === "default" && (
                    <div id="47_17" className="Pixso-symbol-47_17">
                        {slot_45_10 ?? (
                            <p id="45_10" className="Pixso-paragraph-45_10">
                                {"REGION"}
                            </p>
                        )}
                    </div>
                )}
                {button1state === "checked" && (
                    <div id="47_16" className="stroke-wrapper-47_16">
                        <div className="Pixso-symbol-47_16">
                            {button1state === "checked" && (
                                <div className="shadow-blend-unknown-0"></div>
                            )}
                            {slot_47_13 ?? (
                                <p id="47_13" className="Pixso-paragraph-47_13">
                                    {"REGION"}
                                </p>
                            )}
                        </div>
                        <div className="stroke-47_16"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Button1components;
