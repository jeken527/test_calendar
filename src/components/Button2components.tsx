import { withStopPropagation } from "@/utils/utils";
import "@/styles/Button2components.css";
interface Button2componentsProps {
    button2state?: string;
    id?: string;
    className?: string;
    mouseover?: (e: any) => void;
    slot_77_120?: React.ReactNode;
    slot_77_123?: React.ReactNode;
}
const Button2components = (props: Button2componentsProps) => {
    const {
        button2state,
        id,
        className = "",
        mouseover,
        slot_77_120,
        slot_77_123
    } = props;

    return (
        <div
            className={`component-77_127 ${className}`}
            id={id}
            onMouseover={withStopPropagation(mouseover)}
        >
            <div id="77_127" className="Pixso-symbol-77_127">
                {button2state === "default" && (
                    <div id="77_126" className="Pixso-symbol-77_126">
                        {slot_77_120 ?? (
                            <p id="77_120" className="Pixso-paragraph-77_120">
                                {"KOREA"}
                            </p>
                        )}
                    </div>
                )}
                {button2state === "checked" && (
                    <div id="77_125" className="Pixso-symbol-77_125">
                        {slot_77_123 ?? (
                            <p id="77_123" className="Pixso-paragraph-77_123">
                                {"KOREA"}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Button2components;
