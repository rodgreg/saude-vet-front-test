import React,{ useContext, useEffect } from 'react';
import moment from "moment/min/moment-with-locales";
import GlobalContext from '../../context/GlobalContext';

function Day({day, rowIdx}) {
  
  const { daySelected, setDaySelected, setShowEventModal } = useContext(GlobalContext);
  const current = () => {
    if(day.format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
      return 'calendar-day-p2-current';
    } else if(daySelected.format('DD/MM/YYYY') === day.format('DD/MM/YYYY')) { 
      return 'calendar-day-p2-selected';
    } else {
      return 'calendar-day-p2';
    }
  }

  const weekend = () => {
    if(day.day() === 0 || day.day()===6) {
      return 'calendar-weekend';
    } else {
      return 'calendar-day';
    }
  }

  useEffect(() => {
    day.locale('pt-br');
 
  },[])

  return (
    <>
      {rowIdx===0?
        <div className='calendar-day-firstLine'>
          <div className='calendar-day-header'>
            <header>
              <span className='calendar-day-p1'>{day.format('ddd').toUpperCase()}</span>
            </header>
          </div>
          <div className={weekend()}>
            <header>
              <button 
                onClick={() => {
                  setDaySelected(day);
                  setShowEventModal(true);
                }} 
                className={current()}>
                  {day.format('DD')}
              </button>
            </header>
            <div className='calendar-day-content'>
              {moment(new Date(2023,2,2)).format("DD/MM/YYYY") === day.format("DD/MM/YYYY") &&
                <>
                  <div className='calendar-day-content-event'>
                    Event name grande
                  </div>
                  <div style={{fontSize:11, padding:4}}>
                    mais 2 eventos...
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      :
        <div className={weekend()}>
          <header>
            <button 
              onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
              }} 
              className={current()}> 
                {day.format('DD')}
            </button>
          </header>
          <div className='calendar-day-content'>
              {moment(new Date(2023,2,6)).format("DD/MM/YYYY") === day.format("DD/MM/YYYY") &&
                <>
                  <div className='calendar-day-content-event'>
                    Event name grande
                  </div>
                  <div style={{fontSize:11, padding:4}}>
                    mais 2 eventos...
                  </div>
                </>
              }
          </div>
        </div>
      }
    </>
  )
}

export default Day;
