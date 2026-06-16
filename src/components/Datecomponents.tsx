import { withStopPropagation } from "@/utils/utils";
import "@/styles/Datecomponents.css";
interface DatecomponentsProps {
    datestates?: string;
    id?: string;
    className?: string;
    mouseover?: (e: any) => void;
    slot_60_22?: React.ReactNode;
    slot_135_168?: React.ReactNode;
    slot_62_37?: React.ReactNode;
    slot_62_34?: React.ReactNode;
    slot_62_31?: React.ReactNode;
    slot_62_28?: React.ReactNode;
    slot_60_25?: React.ReactNode;
}
const Datecomponents = (props: DatecomponentsProps) => {
    const {
        datestates,
        id,
        className = "",
        mouseover,
        slot_60_22,
        slot_135_168,
        slot_62_37,
        slot_62_34,
        slot_62_31,
        slot_62_28,
        slot_60_25
    } = props;

    return (
        <div
            className={`component-62_45 ${className}`}
            id={id}
            onMouseover={withStopPropagation(mouseover)}
        >
            <div id="62_45" className="Pixso-symbol-62_45">
                {datestates === "default" && (
                    <div id="62_44" className="Pixso-symbol-62_44">
                        {slot_60_22 ?? (
                            <p id="60_22" className="Pixso-paragraph-60_22">
                                {"30"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "my schedule" && (
                    <div id="135_167" className="Pixso-symbol-135_167">
                        {slot_135_168 ?? (
                            <p id="135_168" className="Pixso-paragraph-135_168">
                                {"30"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "disable" && (
                    <div id="62_43" className="Pixso-symbol-62_43">
                        {slot_62_37 ?? (
                            <p id="62_37" className="Pixso-paragraph-62_37">
                                {"30"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "day" && (
                    <div id="62_41" className="Pixso-symbol-62_41">
                        {slot_62_34 ?? (
                            <p id="62_34" className="Pixso-paragraph-62_34">
                                {"S"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "today" && (
                    <div id="62_42" className="Pixso-symbol-62_42">
                        {slot_62_31 ?? (
                            <p id="62_31" className="Pixso-paragraph-62_31">
                                {"30"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "holiday" && (
                    <div id="62_39" className="Pixso-symbol-62_39">
                        {slot_62_28 ?? (
                            <p id="62_28" className="Pixso-paragraph-62_28">
                                {"30"}
                            </p>
                        )}
                    </div>
                )}
                {datestates === "checked" && (
                    <div id="62_40" className="stroke-wrapper-62_40">
                        <div className="Pixso-symbol-62_40">
                            {datestates === "checked" && (
                                <div className="shadow-blend-unknown-0"></div>
                            )}
                            {slot_60_25 ?? (
                                <p id="60_25" className="Pixso-paragraph-60_25">
                                    {"30"}
                                </p>
                            )}
                        </div>
                        <div className="stroke-62_40"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Datecomponents;
