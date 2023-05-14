import { useEffect, useRef, useState, useContext } from 'react';
import moment from "moment/min/moment-with-locales";
import GlobalContext from '../../../context/GlobalContext';

function CalendarDay({ day }) {
  const contentRowsRef = useRef(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [hoursRows, setHoursRows] = useState([]);
  const [hourPosition, setHourPosition] = useState(0);
  const {
    setDaySelected,
    daySelected,
    dayIndex,
    setShowEventModal,
    savedEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  function updatePositionHour() {
    let hour = moment().hour();
    let min = moment().minute();
    var calcMarginTop = Math.floor((hour * 50) + ((min * 50) / 60));
    setHourPosition(calcMarginTop);
  }
  setInterval(updatePositionHour, 60000);

  const showInModalEvent = (idx, day) => {
    setDaySelected(day);
    setSelectedEvent(dayEvents[idx]);
    setShowEventModal(true);
  }

  useEffect(() => {
    updatePositionHour();
    setDayEvents(savedEvents.filter(evt => moment(evt.start).dayOfYear() === day[0]));
  }, [day, savedEvents])

  return (
    <div className='calendar-week'>
      <div className='calendar-day-first-row'>
        <div className='calendar-week-header'>
          <div>Hora</div>
        </div>
        <div className='calendar-day-header'>
          <div style={{
            backgroundColor:
              moment().format("DD/MM/YYYY") === moment().dayOfYear(day[0]).format("DD/MM/YYYY") ?
                "rgb(200, 250, 200, 0.3)"
                : ""
          }}>
            {moment().dayOfYear(day[0]).format("ddd, DD")}
          </div>
        </div>
      </div>

      <div className='calendar-day-container-rows' >
        <div className='current-time-line' ref={contentRowsRef}
          style={{ marginTop: hourPosition }}>{moment().format("HH:mm")}</div>

        {day.map((hour, i) => {
          if (i !== 0) {
            return (
              <div key={i} className='calendar-day-rows' style={{ backgroundColor: hour < '06:00' || hour > '20:00' ? '#ddd' : "" }}>
                <span className='calendar-day-row-data' style={{ backgroundColor: 'var(--bg)' }}>
                  {i % 2 !== 0 ? hour : ""}
                </span>
                <div className='calendar-day-row-data'
                  onClick={() => {
                    let hourEvent = day[i].split(":");
                    setDaySelected(moment().dayOfYear(day[0]).set({ 'hour': hourEvent[0], 'minute': hourEvent[1] }));
                    setShowEventModal(true);
                  }}>

                  {dayEvents.map((evt, ind) => {
                    if (moment(evt.start).format("DD/MM/YYYY") === moment().dayOfYear(day[0]).format("DD/MM/YYYY") && moment(evt.start).format("HH:mm") == day[i]) {
                      return <div key={ind} className='calendar-day-event' style={{ height: Math.floor(25 * (evt.duration / 30)) }}
                        onClick={() => showInModalEvent(ind, moment(evt.start, "DD/MM/YYYY HH:mm"))}> {evt.title} </div>;
                    }
                  })}

                </div>
              </div>
            )
          }
        }
        )}

      </div>
    </div>
  )
}

export default CalendarDay
