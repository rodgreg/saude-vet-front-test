import React, { useState } from 'react';
import { HiViewGrid } from 'react-icons/hi'
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import './dropDown.css';

interface dropDownProps {
    content():JSX.Element[];
    label: string;
    title: string;
}

export const DropDown:React.FC<dropDownProps> = ({content, label, title}) => {

    const [active, setActive] = useState<boolean>(false);

    const toggleSelect = () => {
        setActive(!active);
    }

    return (
        <div className='dropdown-container' onClick={toggleSelect} title={title}>
            <label className={'dropdown-label'} >
                {label!=null && label !=''?label:<HiViewGrid size={24}/>}
                {/* {active?<MdExpandLess  size={26}/> : <MdExpandMore size={26}/>} */}
            </label>
            <ul className={!active?'dropdown-select':'dropdown-select-active'} >
                <div className={!active?'pointer-dropdown-select':'pointer-dropdown-select-active'}/>
                {content()}
            </ul>
        </div>
    )
}