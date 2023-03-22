import { useEffect, useRef, useState } from 'react';
import moment from "moment/min/moment-with-locales";
import { getWeek } from '../util';

function CalendarWeek({week}) {

  const contentRowsRef = useRef(null);
  const [calendarWeekHeader, setCalendarWeekHeader] = useState([]);
  const [hoursRows, setHoursRows] = useState([]);
  const [hourPosition, setHourPosition] = useState(0);

  function updatePositionHour() {
    let hour = moment().hour();
    let min = moment().minute();
    var calcMarginTop = Math.floor((hour * 50) + ((min * 50) / 60));
    setHourPosition(calcMarginTop);
  }
  setInterval(updatePositionHour, 60000);

  useEffect(() => {
    setCalendarWeekHeader(week[0]);
    setHoursRows(week.slice(1, week.length));
    updatePositionHour();
  }, [week])
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
                  <span key={i} className='calendar-week-row-data'>
                    {moment().format("DD/MM/YYYY")===moment(day,"DD/MM/YYYY").format("DD/MM/YYYY") &&
                      <div style={{ backgroundColor: 'rgb(200, 250, 200, 0.3)', width: '100%', height: '100%' }}></div>
                    }
                    {"21/03/2023"===moment(day,"DD/MM/YYYY").format("DD/MM/YYYY") && "09:00"==hour[0] ?
                      <div className='calendar-week-event' style={{height:75}}> {hour[0]} </div>
                      :null
                    }
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
