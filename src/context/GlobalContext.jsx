import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => { },
    daySelected: null,
    setDaySelected: (day) => { },
    showEventModal: true,
    setShowEventModal: () => { },
    dispatchCalEvent: ({ type, payload }) => { },
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => { },
    calendarMode: null,
    setCalendarMode: () => { },
    weekIndex: 0,
    setWeekIndex: (index) => { },
    dayIndex: 0,
    setDayIndex: (index) => { },
})

export default GlobalContext;