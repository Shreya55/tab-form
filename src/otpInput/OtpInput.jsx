// ask -> how many digits are required in this otp.
// try to make a generic component that would work for any digits of otp
// assume - no special chars or alphabets are allowed in input, only single digit numbers -> handle this

import React, { useEffect, useState, useRef } from 'react'
import './otpInput.css'

export default function OtpInput() {

    const NUMBER_OF_DIGITS = 5
    const[inputArr, setInputArr] = useState(new Array(NUMBER_OF_DIGITS).fill(''))
    const inputRef = useRef([]) // for focusing on elements, we need a reference to the input array --> {current: [e1, e2, e3, e4, e5]}

    useEffect(() => {
        inputRef.current[0]?.focus()
    },[])

    const handleChange = (value, index) => {
        console.log('check', value, ' ', index)

        if(isNaN(value)) return
        const newArr = [...inputArr]
        newArr[index] = value.trim().slice(-1) //to get only the last entered digit and also trim spaces
        setInputArr(newArr)
        value.trim() && inputRef.current[index+1]?.focus() // focus on next element after one box is filled and a value is given
        console.log(newArr)
    }

    const handleKeyDown = (e,index) => {
        if(!e.target.value && e.key === 'Backspace'){
            inputRef.current[index-1]?.focus()
        }
    }

  return (
    <div >
        <h1>OTP Input</h1>
         {inputArr.map((n, idx) => {
           return (
             <input
               key={idx}
               type="text"
               value={n}
               className="input-box"
               onChange={(e) => handleChange(e.target.value, idx)}
               ref={(e) => (inputRef.current[idx] = e)} // add a reference to current element of InputArr
               onKeyDown={(e) => handleKeyDown(e,idx)}
             />
           );
         })}
    </div>
  )
}
