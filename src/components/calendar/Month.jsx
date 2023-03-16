import React from 'react'
import Day from './Day'

function Month({month}) {
  return (
    <div className='calendar-month'>
      {month.map((row, id) => (
            <React.Fragment key={id}>
                {row.map((day,idx) => (
                  <Day day={day} key={idx} rowIdx={id} />
                ))}
            </React.Fragment>
      ))}
    </div>
  )
}

export default Month;
