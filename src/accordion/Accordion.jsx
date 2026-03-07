// ask -> where will I get data from

import { useState } from 'react'
import AccordionItem from './AccordionItem'
import './accordion.css'

export const Accordion = () => {

    const data = [
        {
            title: 'Accordion 1',
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
        },
        {
            title: 'Accordion 2',
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
        },
        {
            title: 'Accordion 3',
            desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
        }
    ]

    const [openIndex, setOpenIndex] = useState(0); //currently first element is expanded
    console.log(openIndex)

  return (
    <div>
        {data.map((item, index) => 
        <AccordionItem 
        key={index}
        title={item.title} 
        desc={item.desc}
        isOpen={index === openIndex ? true : false}
        setIsOpen={() => {
            index === openIndex ? setOpenIndex(null) : setOpenIndex(index);
        }}
        />)}
    </div>
  )
}
