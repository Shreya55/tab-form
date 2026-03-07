import { useEffect, useRef, useState } from 'react'
import './stopwatch.css'

export default function Stopwatch() {

    const[isRunning, setIsRunning] = useState(false)
    const[elapsedTime, setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimerRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimerRef.current)
            }, 10)
        }
        
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning])

    function start(){
        setIsRunning(true)
        startTimerRef.current = Date.now() - elapsedTime
    }

    function stop(){
        setIsRunning(false)
    }

    function reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }

    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let min = Math.floor(elapsedTime / (1000 * 60) % 60)
        let sec = Math.floor(elapsedTime / (1000) % 60)
        let milliSec = Math.floor((elapsedTime % (1000)) / 10)

        // to pad the hours etc with two zeroes (00:00:00:00)

        hours = String(hours).padStart(2, "0")
        min = String(min).padStart(2, "0")
        sec = String(sec).padStart(2, "0")
        milliSec = String(milliSec).padStart(2, "0")

        return `${hours}: ${min}: ${sec}: ${milliSec}`
    }

    return <div className='container'>
        <h1>Stopwatch</h1>

        <div className="stopwatch">
            <div className='time'>{formatTime()}</div>

            <div className='buttons'>
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    </div>
}