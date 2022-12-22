import React, { ReactHTMLElement, startTransition, useRef, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import './dropDown.css';

interface dropDownProps {
    content():JSX.Element[];
    label: string;
}

export const DropDown:React.FC<dropDownProps> = ({content, label}) => {

    const [active, setActive] = useState<boolean>(false);

    const toggleSelect = () => {
        setActive(!active);
    }

    return (
        <div className='dropdown-container' onClick={toggleSelect}>
                <label className={'dropdown-label'} >
                    {label}
                    {active?<MdExpandLess  size={26}/> : <MdExpandMore size={26}/>}
                </label>
                <ul className={!active?'dropdown-select':'dropdown-select-active'} >
                    {content()}
                </ul>
        </div>
    )
}