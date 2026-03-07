import { useState, useRef } from 'react'
import './timer.css'

export default function Timer(){
    const [time, setTime] = useState(0)
    const timeRef = useRef(null)

    function handleStart(){
        timeRef.current = setInterval(() => {
            setTime(time=>time+1)
        }, 100)
    }

    function handleStop(){
        clearInterval(timeRef.current)
        timeRef.current=null
    }

    function handleReset(){
        handleStop()
        setTime(0)
    }

    return <div className='container'>
        <h1>Timer</h1>
        <h1>{time}</h1>
        <button onClick={handleStart} >Start</button> <br />
        <button onClick={handleStop}>Stop</button> <br />
        <button onClick={handleReset}>Reset</button>
    </div>
}