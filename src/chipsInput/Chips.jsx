import React, {useState} from 'react'
import './chips.css'

export default function Chips() {
    const[input, setInput] = useState('')
    const[chip, setChip] = useState([])

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && input.trim()){
            setChip((prev) => [...prev, input])
            setInput('')
        }
    }

    const handleDel = (idx) => {
        setChip((prev) => prev.filter((item, i) => i !== idx))
    }

  return (
    <div>
        <h1>Chips Input</h1>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}/>
        
        <div className='main-box'>
            {chip.map((c, idx) => 
            <div className='chip' key={idx}>
                {c}
                <button onClick={() => handleDel(idx)}> x </button>
            </div>)}
        </div>
    </div>
  )
}
