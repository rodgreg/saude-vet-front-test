import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdDelete, MdDragHandle, MdSchedule, MdSegment, MdStart, MdTimelapse, MdTitle } from 'react-icons/md';
import GlobalContext from '../../context/GlobalContext';
import moment from "moment/min/moment-with-locales";
import { Button } from '../utils/HtmlComponents';


function EventModal() {

    const { 
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent?selectedEvent.title:"");
    const [description, setDescription] = useState(selectedEvent?selectedEvent.description:"");
    const [timeStart, setTimeStart] = useState(selectedEvent?selectedEvent.start:daySelected);
    const [duration, setDuration] = useState(selectedEvent?selectedEvent.duration:30);

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            //label: selectedLabel,
            start: timeStart.valueOf(),
            duration:duration,
            id: selectedEvent? selectedEvent.id:Date.now()
        }
        if(selectedEvent) {
            dispatchCalEvent({type:"update", payload: calendarEvent});
        } else {
            dispatchCalEvent({type:"push", payload: calendarEvent});
        }
        setShowEventModal(false);
    }

    useEffect(()=>{
        console.log(selectedEvent);
        moment().locale('pt_br');
    },[])

  return (
    <div className='event-modal'>
      <form className='event-modal-form' onSubmit={handleSubmit}>
        <header className='event-modal-form-header'>
            <MdDragHandle />
            <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{display:'flex',height:'100%', alignItems:'center', justifyContent:'flex-end'}}>
                    <MdSchedule />
                </div>
                <div style={{display:'flex', height:'100%',alignItems:'center', justifyContent:'flex-start'}}>
                    <b>{daySelected.format("DD [de] MMMM - dddd")}</b>
                </div>
            </div>
            <div>
                {selectedEvent && (
                    <MdDelete 
                        style={{cursor:'pointer'}} 
                        onClick={() => {
                            dispatchCalEvent({type: 'delete', payload: selectedEvent});
                            setShowEventModal(false);
                            setSelectedEvent(null);
                    }}/>
                )}
                <MdClose style={{cursor:'pointer'}} onClick={() => {setShowEventModal(false);setSelectedEvent(null);}}/>    
            </div>
        </header>
        <div style={{padding:'0.75rem'}}>
            <div className="event-modal-form-grid">
                <div style={{display:'flex',height:'100%', alignItems:'center', justifyContent:'flex-end',paddingRight:15}}>
                    <MdTitle />
                </div>
                <input type={'text'}
                    name="title" 
                    placeholder='Adicione o título' 
                    value={title} 
                    required
                    className='event-modal-form-grid-title-input'
                    onChange={(e) => setTitle(e.target.value)}/>
                <div style={{display:'flex',height:'100%', alignItems:'center', justifyContent:'flex-end',paddingRight:15}}>
                    <MdSegment />
                </div>
                <input type={'text'}
                    name="description" 
                    placeholder='Adicione uma descrição' 
                    value={description} 
                    required
                    className='event-modal-form-grid-description-input'
                    onChange={(e) => setDescription(e.target.value)}/>
                <div style={{display:'flex',height:'100%', alignItems:'center', justifyContent:'flex-end',paddingRight:15}}>
                    <MdStart />
                </div>
                <input type={'time'}
                    
                    name="description" 
                    placeholder='Adicione a hora de início' 
                    value={moment(timeStart).format('HH:mm')} 
                    required
                    className='event-modal-form-grid-description-input'
                    onChange={(e) => {
                        let time = e.target.value.split(':');
                        setTimeStart(moment(daySelected).set({'hour': Number(time[0]), 'minute':Number(time[1])}))}}/>
                <div style={{display:'flex',height:'100%', alignItems:'center', justifyContent:'flex-end',paddingRight:15}}>
                    <MdTimelapse />
                </div>
                <input type={'number'}
                    step="15"
                    name="description" 
                    placeholder='Adicione uma duração em horas' 
                    value={duration} 
                    required
                    className='event-modal-form-grid-description-input'
                    onChange={(e) => setDuration(e.target.value)}/>
            </div>
        </div>
        <footer style={{display:'flex', justifyContent:'flex-end', width:'100%', borderTop:'1px solid #cccccc', padding:'0.75rem', marginTop:'1.25rem'}}>
            <Button size={'small'} type="submit" >Salvar</Button>
        </footer>
      </form>
    </div>
  )
}

export default EventModal
