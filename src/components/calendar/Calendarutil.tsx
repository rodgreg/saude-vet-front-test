import { useContext, useEffect, useState } from "react";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { getMonth, getWeek } from "./util";
import CalendarHeader from "./CalendarHeader";
import Day from "./calendarDay/CalendarDay";
import Week from "./calendarWeek/CalendarWeek";
import Month from "./calendarMonth/CalendarMonth";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import './calendar.css';

const LayoutCalendar = (props: { mode: any; month: any; week: any;}) => {
  switch (props.mode) {
    case 'month':
      return <Month month={props.month} />;
    case 'week':
      return <Week week={props.week} />;
    case 'day':
      return <Day />;
    default:
      return <Month month={props.month} />;
  }
}

export function Calendarutil() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  const { monthIndex, weekIndex, showEventModal, setDaySelected, calendarMode } = useContext(GlobalContext);

  useEffect(()=>{
    moment().locale('pt_br');
    setCurrentMonth(getMonth(monthIndex));
    setCurrentWeek(getWeek(weekIndex));
    setDaySelected(moment());
  },[monthIndex, weekIndex])

  return (
    <>
      {showEventModal && <EventModal /> }
      <div className="calendar">
        <CalendarHeader />
        <div className="mode">
          <LayoutCalendar mode={calendarMode} month={currentMonth} week={currentWeek}/>
        </div> 
      </div>
    </>
  )
}
