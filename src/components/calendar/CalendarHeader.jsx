import React, { useContext, useEffect } from 'react';
import { MdArrowBack, MdArrowForward, MdCalendarMonth, MdCalendarToday, MdCalendarViewDay, MdCalendarViewMonth, MdCalendarViewWeek } from 'react-icons/md';
import { Button } from '../utils/HtmlComponents';
import GlobalContext from '../../context/GlobalContext';
import moment from "moment/min/moment-with-locales";
import CreateEventButton from './CreateEventButton';

function CalendarHeader() {
  const { monthIndex, setMonthIndex, weekIndex, setWeekIndex, setDaySelected, setCalendarMode, calendarMode } = useContext(GlobalContext);

  const backPeriod = () => {
    switch (calendarMode) {
      case 'month':
        setMonthIndex(monthIndex - 1);
        setWeekIndex(weekIndex-4);
        break;
      case 'week':
        setWeekIndex(weekIndex - 1)
        setMonthIndex(moment().week(weekIndex - 1).month());
        break;
      default:
        break;
    }
  }

  const forwardPeriod = () => {
    switch (calendarMode) {
      case 'month':
        setMonthIndex(monthIndex + 1);
        setWeekIndex(weekIndex + 4);
        break;
      case 'week':
        setWeekIndex(weekIndex + 1)
        setMonthIndex(moment().week(weekIndex + 1).month());
        break;
      default:
        break;
    }
  }

  const backToDay = () => {
      setWeekIndex(moment().week());
      setMonthIndex(moment().month());
      setDaySelected(moment());
  }

  useEffect(() => {
    moment().locale('pt_br');
  }, [])

  return (
    <header className='calendar-header'>
      <div className='calendar-header'>
        <CreateEventButton />
        <h1 style={{ marginRight: 10, fontSize: "1.1rem", lineHeight: "1.75rem", fontWeight: 700, color: "rgb(107, 114, 128, 1)" }}>
          Calendário de Vacinas
        </h1>
        <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 10, paddingLeft: 10, borderLeft: '1px solid rgb(200, 200, 200, 1)' }}>
          <MdArrowBack style={{ cursor: 'pointer' }} onClick={backPeriod} />
          <MdArrowForward style={{ cursor: 'pointer' }} onClick={forwardPeriod} />
          <Button
            size={'small'}
            onClick={backToDay}>
            Hoje
          </Button>
        </span>
        <h2 style={{ marginLeft: 10, fontSize: "1.1rem", lineHeight: "1.75rem", fontWeight: 700, color: "rgb(107, 114, 128, 1)" }}>
          {moment(new Date(moment().year(), monthIndex)).format("MMMM/YYYY")}
        </h2>
      </div>
      <div>
        <>
          <MdCalendarViewDay size={22} style={{cursor:'pointer'}} onClick={() => setCalendarMode('day')}/>
          <MdCalendarViewWeek size={22} style={{cursor:'pointer'}} onClick={() => setCalendarMode('week')}/>
          <MdCalendarMonth size={22} style={{cursor:'pointer'}} onClick={() => setCalendarMode('month')}/>
        </>
      </div>
    </header>
  )
}

export default CalendarHeader

