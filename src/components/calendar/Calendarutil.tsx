import { useContext, useEffect, useState } from "react";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { getDay, getMonth, getWeek } from "./util";
import CalendarHeader from "./CalendarHeader";
import Day from "./calendarDay/CalendarDay";
import Week from "./calendarWeek/CalendarWeek";
import Month from "./calendarMonth/CalendarMonth";
import GlobalContext from "../../context/GlobalContext";
import EventModal from "./EventModal";
import './calendar.css';

const LayoutCalendar = (props: { mode: any; month: any; week: any; day: any;}) => {
  switch (props.mode) {
    case 'month':
      return <Month month={props.month} />;
    case 'week':
      return <Week week={props.week} />;
    case 'day':
      return <Day day={props.day} />;
    default:
      return <Month month={props.month} />;
  }
}

export function Calendarutil() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  const [currentDay, setCurrentDay] = useState(getDay());
  const { monthIndex, weekIndex, showEventModal, setDaySelected, calendarMode, dayIndex } = useContext(GlobalContext);

  useEffect(()=>{
    moment().locale('pt_br');
    setCurrentMonth(getMonth(monthIndex));
    setCurrentWeek(getWeek(weekIndex));
    setCurrentDay(getDay(dayIndex))
    setDaySelected(moment());
  },[monthIndex, weekIndex, dayIndex])

  return (
    <>
      {showEventModal && <EventModal /> }
      <div className="calendar">
        <CalendarHeader />
        <div className="mode">
          <LayoutCalendar mode={calendarMode} month={currentMonth} week={currentWeek} day={currentDay}/>
        </div> 
      </div>
    </>
  )
}
