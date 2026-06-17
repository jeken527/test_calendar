import Regionmenu from "@/components/Regionmenu";
import { useState, useEffect, useRef } from "react";
import Button1components from "@/components/Button1components";
import Button2components from "@/components/Button2components";
import Editmenu from "@/components/Editmenu";
import Searchmenu from "@/components/Searchmenu";
import Resetbutton from "@/components/Resetbutton";
import Datecomponents from "@/components/Datecomponents";
import Dateselectbutton1 from "@/components/Dateselectbutton1";
import Dateselectbutton2 from "@/components/Dateselectbutton2";

// 스타일 시트 임포트
import "@/styles/Frame72327.css";
import "@/styles/Frame107433.css"; 
import "@/styles/Frame97172.css"; 
import "@/styles/Frame120147.css"; 

declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}

const CLIENT_ID = "930243544712-7j81q7c4d7885v43u1nqlmgbdtf85oat.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const HOLIDAY_CALENDARS: Record<string, string> = {
    KR: "ko.south_korea#holiday@group.v.calendar.google.com",
    JP: "ja.japanese#holiday@group.v.calendar.google.com",
    US: "en.usa#holiday@group.v.calendar.google.com"
};

const Frame72327 = () => {
    // ----------------------------------------------------
    // 1. 유저 원본 메뉴 상태 (드롭다운 열림/닫힘)
    // ----------------------------------------------------
    const [regionmenu_52_20, setRegionmenu_52_20] = useState("False");

    // ----------------------------------------------------
    // 2. 엔진 상태 (데이터 및 팝업창 컨트롤)
    // ----------------------------------------------------
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedRegion, setSelectedRegion] = useState("KR");
    const [holidays, setHolidays] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const tokenClientRef = useRef<any>(null);

    // 🎯 1번 모달: 일정 추가
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [eventMemo, setEventMemo] = useState("");

    // 🎯 2번 모달: 일정 확인/삭제
    const [viewModalData, setViewModalData] = useState<{ isOpen: boolean; eventId?: string; title: string; isHoliday: boolean }>({ isOpen: false, title: "", isHoliday: false });

    // 🎯 3번 모달: SEARCH 검색 팝업창
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchResults = searchQuery.trim() ? events.filter(e => e.summary?.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    // 구글 API 로드
    useEffect(() => {
        const loadScripts = () => {
            const gapiScript = document.createElement("script");
            gapiScript.src = "https://apis.google.com/js/api.js";
            gapiScript.onload = () => {
                window.gapi.load("client", async () => {
                    await window.gapi.client.init({});
                    await window.gapi.client.load("calendar", "v3");
                    checkToken();
                });
            };
            document.body.appendChild(gapiScript);

            const gisScript = document.createElement("script");
            gisScript.src = "https://accounts.google.com/gsi/client";
            gisScript.onload = () => {
                tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    callback: (resp: any) => {
                        if (resp.error) return;
                        setIsAuthenticated(true);
                        localStorage.setItem("gcal_token", JSON.stringify(resp));
                    },
                });
            };
            document.body.appendChild(gisScript);
        };
        loadScripts();
    }, []);

    const checkToken = () => {
        const token = localStorage.getItem("gcal_token");
        if (token) {
            window.gapi.client.setToken(JSON.parse(token));
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchCalendarData();
    }, [isAuthenticated, currentDate, selectedRegion]);

    const fetchCalendarData = async () => {
        try {
            const timeMin = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
            const timeMax = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, 0).toISOString();
            
            const holidayResp = await window.gapi.client.calendar.events.list({
                calendarId: HOLIDAY_CALENDARS[selectedRegion], timeMin, timeMax, singleEvents: true,
            });
            setHolidays(holidayResp.result.items || []);

            const eventsResp = await window.gapi.client.calendar.events.list({
                calendarId: "primary", timeMin, timeMax, singleEvents: true, orderBy: "startTime"
            });
            setEvents(eventsResp.result.items || []);
        } catch (error: any) {
            if (error.status === 401) setIsAuthenticated(false);
        }
    };

    const handleLogin = () => tokenClientRef.current?.requestAccessToken({ prompt: "consent" });

    const handleSaveEvent = async () => {
        if (!eventTitle.trim() || !eventStartDate) return;
        try {
            await window.gapi.client.calendar.events.insert({
                calendarId: "primary",
                resource: { 
                    summary: eventTitle, 
                    description: eventMemo,
                    start: { date: eventStartDate }, 
                    end: { date: eventEndDate || eventStartDate } 
                }
            });
            setEventTitle(""); setEventStartDate(""); setEventEndDate(""); setEventMemo("");
            setIsAddModalOpen(false);
            fetchCalendarData();
        } catch (error) {}
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!window.confirm("DELETE SCHEDULE?")) return;
        try {
            await window.gapi.client.calendar.events.delete({ calendarId: "primary", eventId });
            setViewModalData({ isOpen: false, title: "", isHoliday: false });
            fetchCalendarData();
        } catch (error) {}
    };

    const openAddModal = (dateStr: string) => {
        setEventStartDate(dateStr);
        setEventEndDate(dateStr);
        setIsAddModalOpen(true);
    };

    // ----------------------------------------------------
    // 달력 렌더링
    // ----------------------------------------------------
    const getGridDates = (year: number, month: number) => {
        const grid = [];
        const startDay = new Date(year, month, 1).getDay();
        const prevEnd = new Date(year, month, 0).getDate();
        const currEnd = new Date(year, month + 1, 0).getDate();

        for (let i = startDay - 1; i >= 0; i--) grid.push({ date: new Date(year, month - 1, prevEnd - i), isCurrentMonth: false });
        for (let i = 1; i <= currEnd; i++) grid.push({ date: new Date(year, month, i), isCurrentMonth: true });
        let nextDay = 1;
        while (grid.length < 42) grid.push({ date: new Date(year, month + 1, nextDay++), isCurrentMonth: false });
        return grid;
    };

    const getDateState = (targetDate: Date, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return "disable";
        const dateStr = targetDate.toISOString().split("T")[0];
        if (dateStr === new Date().toISOString().split("T")[0]) return "today";
        if (holidays.some(h => (h.start?.date || h.start?.dateTime?.split("T")[0]) === dateStr)) return "holiday";
        if (events.some(e => (e.start?.date || e.start?.dateTime?.split("T")[0]) === dateStr)) return "my schedule";
        return "default";
    };

    const pStyle = { fontFamily: "Retro Gaming, DungGeunMo, monospace", fontSize: "15px", color: "inherit", margin: 0 };
    
    // 달력 일자 렌더링 (이 부분은 유저님이 완벽하다고 하신 코드 그대로 보존!)
    const renderCell = (item: any, idx: number) => {
        const day = String(item.date.getDate());
        const dateStr = item.date.toISOString().split("T")[0];
        
        if (!item.isCurrentMonth) {
            return <Datecomponents key={idx} datestates="disable" slot_62_37={<p style={pStyle}>{day}</p>} />;
        }
        
        const state = getDateState(item.date, true);
        
        if (state === "holiday") {
            return (
                <div key={idx} onClick={(e) => { 
                    e.stopPropagation(); 
                    const hol = holidays.find(h => (h.start?.date || h.start?.dateTime?.split("T")[0]) === dateStr);
                    setViewModalData({ isOpen: true, title: hol?.summary || "공휴일", isHoliday: true }); 
                }} style={{cursor:"pointer"}}>
                    <Dateselectbutton2 dateselectnew2="holiday" slot_146_537={
                        <Datecomponents datestates="holiday" slot_62_28={<p style={pStyle}>{day}</p>} />
                    } />
                </div>
            );
        }
        if (state === "my schedule") {
            return (
                <div key={idx} onClick={(e) => { 
                    e.stopPropagation(); 
                    const evnt = events.find(e => (e.start?.date || e.start?.dateTime?.split("T")[0]) === dateStr);
                    setViewModalData({ isOpen: true, eventId: evnt?.id, title: evnt?.summary || "일정", isHoliday: false }); 
                }} style={{cursor:"pointer"}}>
                    <Dateselectbutton2 dateselectnew2="my schedule" slot_146_536={
                        <Datecomponents datestates="my schedule" slot_135_168={<p style={pStyle}>{day}</p>} />
                    } />
                </div>
            );
        }

        if (state === "today") {
            return (
                <div key={idx} onClick={() => openAddModal(dateStr)} style={{cursor:"pointer"}}>
                    <Dateselectbutton1 dateselectbutton="today" slot_146_414={
                        <Datecomponents datestates="today" slot_62_31={<p style={pStyle}>{day}</p>} />
                    } />
                </div>
            );
        }
        return (
            <div key={idx} onClick={() => openAddModal(dateStr)} style={{cursor:"pointer"}}>
                <Dateselectbutton1 dateselectbutton="default" slot_146_413={
                    <Datecomponents datestates="default" slot_60_22={<p style={pStyle}>{day}</p>} />
                } />
            </div>
        );
    };

    const leftDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const rightDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
    const leftGrid = getGridDates(leftDate.getFullYear(), leftDate.getMonth());
    const rightGrid = getGridDates(rightDate.getFullYear(), rightDate.getMonth());

    return (
        <div className="scroll-container" style={{ position: "relative" }}>
            
            {/* 🎯 텍스트 변조 버그를 우회하는 강제 호버 CSS 스타일 블록 🎯 */}
            <style>{`
                .hover-target {
                    cursor: pointer !important;
                    pointer-events: auto !important;
                }
                .hover-target:hover > div,
                .hover-target:hover [class*="Pixso-symbol"] {
                    background-color: rgba(176, 176, 176, 1) !important;
                }
            `}</style>

            <div id="72_327" className="stroke-wrapper-72_327">
                <div className="Pixso-frame-72_327">
                    <div className="frame-content-72_327">
                        
                        {/* 최상단 로그인 연동 바 */}
                        <div id="45_8" className="Pixso-frame-45_8" onClick={handleLogin} style={{ cursor: "pointer", zIndex: 9999, position: "relative" }}>
                            <div className="frame-content-45_8">
                                <div id="129_166" className="Pixso-frame-129_166">
                                    <p id="45_7" className="Pixso-paragraph-45_7" style={{ fontFamily: "Retro Gaming, monospace" }}>
                                        {isAuthenticated ? "CALENDAR CONNECTED" : "CLICK TO LOGIN"}
                                    </p>
                                </div>
                                <div id="8_16" className="Pixso-frame-8_16">
                                    <div className="frame-content-8_16">
                                        <div id="8_12" className="stroke-wrapper-8_12">
                                            <div className="Pixso-frame-8_12">
                                                <div className="frame-content-8_12">
                                                    <div id="10_34" className="stroke-wrapper-10_34">
                                                        <div className="Pixso-rectangle-10_34" style={{ backgroundColor: isAuthenticated ? "#00ff00" : "#ff0000" }}></div>
                                                        <div className="stroke-10_34"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="stroke-8_12"></div>
                                        </div>
                                        <div id="8_14" className="stroke-wrapper-8_14">
                                            <div className="Pixso-frame-8_14">
                                                <div className="frame-content-8_14">
                                                    <div id="45_5" className="Pixso-vector-45_5"></div>
                                                </div>
                                            </div>
                                            <div className="stroke-8_14"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 🎯 메뉴 툴바 영역 (상자 겹침 방지 & 호버/클릭 정밀 연결 완료!) 🎯 */}
                        <div id="52_30" className="Pixso-frame-52_30" style={{ position: "relative", zIndex: 9000, overflow: "visible" }}>
                            <div className="frame-content-52_30">
                                
                                <Regionmenu
                                    id="52_20" className="Pixso-instance-52_20" regionmenu={regionmenu_52_20}
                                    slot_97_144={
                                        <div onClick={(e) => { e.stopPropagation(); setRegionmenu_52_20("True"); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button1components className="Pixso-instance-2_188 hover-target" button1state="default" slot_45_10={<p id="2_189" className="Pixso-paragraph-2_189">{"REGION"}</p>} />
                                        </div>
                                    }
                                    slot_97_159={
                                        <div onClick={(e) => { e.stopPropagation(); setRegionmenu_52_20("False"); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button1components className="Pixso-instance-2_188 hover-target" button1state="default" slot_45_10={<p id="2_189_exp" className="Pixso-paragraph-2_189">{"REGION"}</p>} />
                                        </div>
                                    }
                                    slot_97_161={
                                        <div onClick={(e) => { e.stopPropagation(); setSelectedRegion("KR"); setRegionmenu_52_20("False"); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button2components className="Pixso-instance-97_161 hover-target" button2state="default" slot_77_120={<p id="77_120_kr" className="Pixso-paragraph-77_120">{"KOREA"}</p>} />
                                        </div>
                                    }
                                    slot_97_162={
                                        <div onClick={(e) => { e.stopPropagation(); setSelectedRegion("JP"); setRegionmenu_52_20("False"); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button2components className="Pixso-instance-97_162 hover-target" button2state="default" slot_77_120={<p id="77_120_jp" className="Pixso-paragraph-77_120">{"JAPAN"}</p>} />
                                        </div>
                                    }
                                    slot_97_163={
                                        <div onClick={(e) => { e.stopPropagation(); setSelectedRegion("US"); setRegionmenu_52_20("False"); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button2components className="Pixso-instance-97_163 hover-target" button2state="default" slot_77_120={<p id="77_120_us" className="Pixso-paragraph-77_120">{"AMERICA"}</p>} />
                                        </div>
                                    }
                                />

                                {/* 🎯 가장 확실한 EDIT 기능 다이렉트 연결 (클릭 가림막 원천 차단) 🎯 */}
                                <Editmenu
                                    id="52_23" className="Pixso-instance-52_23" editmenu="False"
                                    slot_107_320={
                                        <div onClick={() => openAddModal(new Date().toISOString().split("T")[0])} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button1components className="Pixso-instance-2_170 hover-target" button1state="default" slot_45_10={<p id="2_171" className="Pixso-paragraph-2_171">{"EDIT"}</p>} />
                                        </div>
                                    }
                                />

                                {/* SEARCH 기능 다이렉트 연결 */}
                                <Searchmenu 
                                    id="52_26" className="Pixso-instance-52_26" searchmenu="False" 
                                    slot_107_367={
                                        <div onClick={() => setIsSearchModalOpen(true)} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button1components className="Pixso-instance-2_176 hover-target" button1state="default" slot_45_10={<p id="2_177" className="Pixso-paragraph-2_177">{"SEARCH"}</p>} />
                                        </div>
                                    } 
                                />
                                
                                {/* RESET 기능 다이렉트 연결 */}
                                <Resetbutton 
                                    id="52_28" className="Pixso-instance-52_28" resetmenu="default" 
                                    slot_143_265={
                                        <div onClick={() => { setCurrentDate(new Date()); setSelectedRegion("KR"); setSearchQuery(""); }} style={{ position: "relative", zIndex: 9999 }}>
                                            <Button1components className="Pixso-instance-2_186 hover-target" button1state="default" slot_45_10={<p id="2_187" className="Pixso-paragraph-2_187">{"RESET"}</p>} />
                                        </div>
                                    } 
                                />
                            </div>
                        </div>

                        {/* 메인 달력 프레임 */}
                        <div id="68_326" className="stroke-wrapper-68_326">
                            <div className="Pixso-frame-68_326">
                                <div className="shadow-blend-unknown-0"></div>
                                <div className="frame-content-68_326">
                                    <div id="66_206" className="Pixso-frame-66_206">
                                        <div className="frame-content-66_206">
                                            <div id="66_205" className="Pixso-frame-66_205">
                                                <div className="frame-content-66_205">
                                                    <div id="66_201" className="Pixso-frame-66_201"><div className="frame-content-66_201"><p id="66_198" className="Pixso-paragraph-66_198" style={{fontFamily:"Retro Gaming, monospace"}}>{leftDate.getFullYear()}</p></div></div>
                                                    <div id="66_202" className="Pixso-frame-66_202"><div className="frame-content-66_202"><p id="66_203" className="Pixso-paragraph-66_203" style={{fontFamily:"Retro Gaming, monospace"}}>{String(leftDate.getMonth() + 1).padStart(2, '0')}</p></div></div>
                                                </div>
                                            </div>
                                            <div id="64_170" className="Pixso-frame-64_170">
                                                <div className="frame-content-64_170">
                                                    <div id="64_78" className="Pixso-frame-64_78">
                                                        <div className="frame-content-6
