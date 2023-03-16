import React, { useContext } from 'react'
import { MdAdd } from 'react-icons/md';
import GlobalContext from '../../context/GlobalContext';
import { Button } from '../utils/HtmlComponents'


function CreateEventButton() {

    const { setShowEventModal } = useContext(GlobalContext);

  return <Button size={'small'} onClick={() => setShowEventModal(true)} ><MdAdd /> Novo</Button>
}

export default CreateEventButton;
