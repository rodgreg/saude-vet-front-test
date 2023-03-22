import { useEffect, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import moment from "moment/min/moment-with-locales";

function savedEventsReducer(state, {type, payload}) {
  switch(type) {
    case 'push':
      return [...state,payload];
    case 'update':
      return state.map(evt => evt.id === payload.id? payload : evt);
    case 'delete':
      return state.filter(evt => evt.id !== payload.id);    
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;

}

function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(moment().month());
    const [weekIndex, setWeekIndex] = useState(moment().week());
    const [daySelected, setDaySelected] = useState(moment());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [calendarMode, setCalendarMode] = useState('month');
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

    useEffect(() => {
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    },[savedEvents])

    useEffect(()=>{
      moment().locale('pt_br');
    },[])

  return (
    <GlobalContext.Provider 
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        calendarMode,
        setCalendarMode,
        weekIndex,
        setWeekIndex
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper;
