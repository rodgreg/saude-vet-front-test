import { useContext, useEffect, useState } from 'react';
import moment from "moment/min/moment-with-locales";
import GlobalContext from '../../../context/GlobalContext';

function Day({ day, rowIdx }) {

  const [dayEvents, setDayEvents] = useState([]);
  const {
    daySelected,
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent
  } = useContext(GlobalContext);

  const current = () => {
    if (day.format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
      return 'calendar-day-p2-current';
    } else if (daySelected.format('DD/MM/YYYY') === day.format('DD/MM/YYYY')) {
      return 'calendar-day-p2-selected';
    } else {
      return 'calendar-day-p2';
    }
  }

  const weekend = () => {
    if (day.day() === 0 || day.day() === 6) {
      return 'calendar-weekend';
    } else {
      return 'calendar-day';
    }
  }

  const showInModalEvent = (idx) => {
    setDaySelected(day);
    setSelectedEvent(dayEvents[idx]);
    setShowEventModal(true)
  }

  useEffect(() => {
    day.locale('pt-br');
    const events = savedEvents.filter(evt => moment(evt.day).format("DD-MM-YYYY") === day.format("DD-MM-YYYY"));
    setDayEvents(events);
  }, [savedEvents, day])

  return (
    <>
      {rowIdx === 0 ?
        <div className='calendar-day-firstLine'>
          <div className='calendar-day-header'>
            <header>
              <span className='calendar-day-p1'>{day.format('ddd').toUpperCase()}</span>
            </header>
          </div>
        </div>
        :
        <div className={weekend()}>
          <header>
            <button
              onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
                setSelectedEvent(null);
              }}
              className={current()}>
              {day.format('DD')}
            </button>
          </header>
          <div className='calendar-day-content'>
            {dayEvents.length === 1 ?
              <div className='calendar-day-content-event' onClick={() => showInModalEvent(0)}>
                {dayEvents[0].title}
              </div>
              :
              dayEvents.length > 1 &&
              <>
                <div className='calendar-day-content-event' onClick={() => showInModalEvent(0)}>
                  {dayEvents[0].title}
                </div>
                {dayEvents.length == 2 && dayEvents.length > 1 ?
                  <div className='calendar-day-content-event' onClick={() => showInModalEvent(1)}>
                    {dayEvents[1].title}
                  </div>
                  :
                  <div style={{ fontSize: 11, padding: 4 }}>
                    mais {dayEvents.length - 1} eventos...
                  </div>
                }
              </>
            }
          </div>
        </div>
      }
    </>
  )
}

export default Day;
