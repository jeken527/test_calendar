import Button1components from "@/components/Button1components";
import { useState } from "react";
import { withStopPropagation } from "@/utils/utils";
import { motion, AnimatePresence } from "motion/react";
import Button2components from "@/components/Button2components";
import "@/styles/Regionmenu.css";

interface RegionmenuProps {
    regionmenu?: string;
    id?: string;
    className?: string;
    click?: (e: any) => void;
    transitionConfig?: any;
    slot_97_144?: React.ReactNode;
    slot_97_159?: React.ReactNode;
    slot_97_161?: React.ReactNode;
    slot_97_162?: React.ReactNode;
    slot_97_163?: React.ReactNode;
}

const Regionmenu = (props: RegionmenuProps) => {
    const {
        regionmenu, id, className = "", click,
        slot_97_144, slot_97_159, slot_97_161, slot_97_162, slot_97_163
    } = props;

    // 호버 상태 관리
    const [button1state_97_144, setButton1state_97_144] = useState("default");
    const [button2state_97_161, setButton2state_97_161] = useState("default");
    const [button2state_97_162, setButton2state_97_162] = useState("default");
    const [button2state_97_163, setButton2state_97_163] = useState("default");

    return (
        <div className={`component-97_172 ${className}`} id={id} onClick={withStopPropagation(click)}>
            <div id="97_172" className="Pixso-symbol-97_172" style={{ position: 'relative', width: '100%', height: '100%' }}>
                
                {/* 1. 🎯 항상 얌전히 고정되어 있는 REGION 버튼 (애니메이션 밖으로 탈출!) */}
                <div style={{ position: 'relative', zIndex: 10, width: '78px', height: '25px' }}>
                    {regionmenu === "False" ? (
                        slot_97_144 ?? (
                            <Button1components id="97_144" className="Pixso-instance-97_144" button1state={button1state_97_144} mouseover={() => setButton1state_97_144("checked")} />
                        )
                    ) : (
                        slot_97_159 ?? (
                            <Button1components id="97_159" className="Pixso-instance-97_159" button1state="checked" />
                        )
                    )}
                </div>

                {/* 2. 🎯 드롭다운 메뉴판만 콕 집어서 애니메이션 적용! */}
                <AnimatePresence>
                    {regionmenu === "True" && (
                        <motion.div
                            key="dropdown-menu"
                            initial={{ opacity: 0, y: -5 }} /* 위에서 아래로 살짝 내려오는 애니메이션 */
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{ position: 'absolute', top: '25px', left: '0px', zIndex: 99999 }}
                        >
                            <div id="97_160" className="stroke-wrapper-97_160">
                                <div className="Pixso-frame-97_160">
                                    <div className="shadow-blend-unknown-0"></div>
                                    <div className="frame-content-97_160">
                                        {slot_97_161 ?? (
                                            <Button2components id="97_161" className="Pixso-instance-97_161" button2state={button2state_97_161} mouseover={() => setButton2state_97_161("checked")} />
                                        )}
                                        {slot_97_162 ?? (
                                            <Button2components id="97_162" className="Pixso-instance-97_162" button2state={button2state_97_162} mouseover={() => setButton2state_97_162("checked")} slot_77_120={<p id="77_120" className="Pixso-paragraph-77_120">{"JAPAN"}</p>} />
                                        )}
                                        {slot_97_163 ?? (
                                            <Button2components id="97_163" className="Pixso-instance-97_163" button2state={button2state_97_163} mouseover={() => setButton2state_97_163("checked")} slot_77_120={<p id="77_120" className="Pixso-paragraph-77_120">{"AMERICA"}</p>} />
                                        )}
                                    </div>
                                </div>
                                <div className="stroke-97_160"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
        </div>
    );
};
export default Regionmenu;
