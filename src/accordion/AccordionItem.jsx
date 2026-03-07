import React from 'react'

export default function AccordionItem({title, desc, isOpen, setIsOpen}) {
  return (
    <div className='accordion-container'>
        <div className='accordion-title' onClick={() => {setIsOpen((isOpen) => !isOpen)}}>
            <span>{title}</span>
            <span id='symbol'>↕️</span>
        </div>
        {isOpen && <div>{desc}</div>}
    </div>
  )
}
