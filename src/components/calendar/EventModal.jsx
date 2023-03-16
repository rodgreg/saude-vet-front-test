import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdDragHandle, MdSchedule, MdSegment, MdTitle } from 'react-icons/md';
import GlobalContext from '../../context/GlobalContext';
import moment from "moment/min/moment-with-locales";
import { Button } from '../utils/HtmlComponents';


function EventModal() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { setShowEventModal, daySelected } = useContext(GlobalContext);

    useEffect(()=>{
        moment().locale('pt_br');
    },[])
  return (
    <div className='event-modal'>
      <form className='event-modal-form'>
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
            <MdClose style={{cursor:'pointer'}} onClick={() => {setShowEventModal(false)}}/>
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
