import { useContext, useEffect, useState } from "react";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { getMonth } from "./util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import './calendar.css';


export function Calendarutil() {
  const [currentMonth, setCurrenteMonth] = useState(getMonth());
  const { monthIndex, showEventModal, setDaySelected } = useContext(GlobalContext);

  useEffect(()=>{
    moment().locale('pt_br');
    setCurrenteMonth(getMonth(monthIndex));
    setDaySelected(moment());
  },[monthIndex])

  return (
    <>
      {showEventModal && <EventModal /> }
      <div className="calendar">
        <CalendarHeader />
        <div className="sidebar">
          <Sidebar />
          <Month month={currentMonth} />
        </div> 
      </div>
    </>
  )
}
