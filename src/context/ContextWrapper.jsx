import React, { useEffect, useState } from 'react';
import GlobalContext from './GlobalContext';
import moment from "moment/min/moment-with-locales";

function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(moment().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(moment());
    const [showEventModal, setShowEventModal] = useState(null);

    useEffect(()=>{
      moment().locale('pt_br');
      if(smallCalendarMonth !== null) {
        setMonthIndex(smallCalendarMonth);
      }
    },[smallCalendarMonth])

  return (
    <GlobalContext.Provider 
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper;
