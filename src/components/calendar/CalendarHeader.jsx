import React, { useContext, useEffect } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Button } from '../utils/HtmlComponents';
import GlobalContext from '../../context/GlobalContext';
import moment from "moment/min/moment-with-locales";
import CreateEventButton from './CreateEventButton';

function CalendarHeader() {
  const { monthIndex, setMonthIndex, setDaySelected } = useContext(GlobalContext);

  useEffect(() => {
    moment().locale('pt_br');
  },[])

  return (
    <header className='calendar-header'>
      <CreateEventButton />
      <h1 style={{marginRight:10, fontSize: "1.1rem", lineHeight: "1.75rem", fontWeight: 700, color: "rgb(107, 114, 128, 1)"}}>
        Calendário de Vacinas  
      </h1>
      <span style={{display:'flex', flexDirection:'row', alignItems:'center', gap:10, marginRight:10, paddingLeft:10, borderLeft:'1px solid rgb(200, 200, 200, 1)'}}>
        <MdArrowBack style={{cursor:'pointer'}} onClick={()=>setMonthIndex(monthIndex-1)}/> 
        <MdArrowForward style={{cursor:'pointer'}} onClick={()=>setMonthIndex(monthIndex+1)}/> 
        <Button 
          size={'small'} 
          onClick={()=>{
            setMonthIndex(moment().month());
            setDaySelected(moment());
          }}>
            Hoje
          </Button> 
      </span>
      
      <h2 style={{marginLeft:10, fontSize: "1.1rem", lineHeight: "1.75rem", fontWeight: 700, color: "rgb(107, 114, 128, 1)"}}>
        {moment(new Date(moment().year(), monthIndex)).format("MMMM/YYYY")}
      </h2>
    </header>
  )
}

export default CalendarHeader

