import { useEffect, useRef, useState, useContext } from 'react';
import moment from "moment/min/moment-with-locales";
import GlobalContext from '../../../context/GlobalContext';

function CalendarWeek({week}) {

  const contentRowsRef = useRef(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [calendarWeekHeader, setCalendarWeekHeader] = useState([]);
  const [hoursRows, setHoursRows] = useState([]);
  const [hourPosition, setHourPosition] = useState(0);
  const {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent
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
    setCalendarWeekHeader(week[0]);
    setHoursRows(week.slice(1, week.length));
    updatePositionHour();
    setDayEvents(savedEvents.filter(evt => moment(evt.day).week() === moment(week[0][0],"DD/MM/YYYY").week()));
  }, [week, savedEvents])
  return (
    <div className='calendar-week'>
      <div className='calendar-week-first-row'>
        <div className='calendar-week-header'>
          <div>Hora</div>
        </div>
        {calendarWeekHeader.map((dayH, idx) => {
          return (
            <div key={idx} className='calendar-week-header'>
              <div>{moment(dayH, "DD/MM/YYYY").format("ddd, DD")}</div>
            </div>
          )
        })}
      </div>
      <div className='calendar-week-container-rows' >
        <div className='current-time-line' ref={contentRowsRef}
          style={{ marginTop: hourPosition }}>{moment().format("HH:mm")}</div>
        {hoursRows.map((hour, id) => {
          return (
            <div key={id} className='calendar-week-rows'>
              <span className='calendar-week-row-data' style={{ backgroundColor: 'var(--bg)' }}>{hour[0]}</span>
              {calendarWeekHeader.map((day, i) => {
                return (
                  <span key={i} className='calendar-week-row-data' 
                    onClick={() => {
                      let hourEvent = hour[0].split(":");
                      setDaySelected(moment(day,"DD/MM/YYYY").set({'hour':hourEvent[0],'minute':hourEvent[1]}));
                      setShowEventModal(true);
                      //setSelectedEvent(null);
                    }}>
                    {moment().format("DD/MM/YYYY")===moment(day,"DD/MM/YYYY").format("DD/MM/YYYY") &&
                      <div style={{ backgroundColor: 'rgb(200, 250, 200, 0.3)', width: '100%', height: '100%' }}></div>
                    }
                    {dayEvents.map((evt,ind) => {
                      if(moment(evt.start).format("DD/MM/YYYY")===moment(day,"DD/MM/YYYY").format("DD/MM/YYYY") && moment(evt.start).format("HH:mm")==hour[0]) {
                        return <div key={ind} className='calendar-week-event' style={{height:Math.floor(25*(evt.duration/30))}}
                                    onClick={() => showInModalEvent(ind, moment(evt.start,"DD/MM/YYYY HH:mm"))}> {hour[0]} </div>;
                      }
                    })}                    
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarWeek;
