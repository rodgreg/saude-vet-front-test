import React from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPuglin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';
// import { toMoment } from '@fullcalendar/moment';
// import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { INITIAL_EVENTS, createEventId } from './event-utils';

interface DemoAppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}

export function Calendarutil() {
    
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }
  
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }
  
  const handleEvents = (events: EventApi[]) => {
    
  }

  return (
    <FullCalendar
      timeZone={"America/Sao_Paulo"}
      locales={allLocales}
      locale={"pt-br"}
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPuglin ]}
      initialView={"dayGridMonth"}
      headerToolbar={{
                        start:"prev,next today",
                        center:"title",
                        end:"dayGridMonth,timeGridWeek",
                    }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      height={"60vh"}
      weekends={true}
      businessHours={{
                      daysOfWeek:[1,2,3,4,5],
                      startTime:'08:00',
                      endTime:'18:00'
                    }}
      scrollTime={'08:00'}
      //initialEvents={INITIAL_EVENTS}
      //select={this.handleDateSelect}
      //eventContent={renderEventContent} // custom render function
      //eventClick={this.handleEventClick}
      // eventsSet={this.handleEvents}

      events={[
        {
          id:'a',
          title:'Teste meu evento!',
          start:'2023-02-22T13:00:00',
          end:'2023-02-22T13:30:00',
          overlap:false,
          // url:'http://google.com',
          display:'auto',
          description:"Teste de descrição do evento!",
          extendedProps: {
            department: 'BioChemistry'
          },

                          
        },
        {
          id:'b',
          title:'Teste meu evento!',
          start:'2023-02-21',
          backgroundColor:'red',
          borderColor:'red',
        },
      ]}
    />
  )
}

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
        </>
    )
}