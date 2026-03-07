import { useState } from 'react'
import './passwordGenerator.css'
import UseGeneratePassword from './hooks/useGeneratePassword'
import PasswordStrength from './PasswordStrength'

export default function PasswordGenerator(){

    const[length, setLength] = useState(0)
    const [checkBoxData, setCheckboxData] = useState([
        {title: "Include Uppercase letters", state: false},
        {title: "Include Lowercase letters", state: false},
        {title: "Include numbers", state: false},
        {title: "Include symbols", state: false},
    ])

    const [copied, setCopied] = useState(false)

    function handleCheckbox(i){
        const updatedCheckbox = [...checkBoxData]
        updatedCheckbox[i].state = !updatedCheckbox[i].state
        setCheckboxData(updatedCheckbox)
    }

    const {password, errorMessage, generatePassword} = UseGeneratePassword()

    function handleCopy(){
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    return <div>
        <h1>Password Generator</h1>

        <div className='main-container'>

            { password && <div className="header">
                <div>{password}</div>
                <button className='btn' onClick={handleCopy}> {copied ? "Copied" : "Copy"} </button>
            </div>}

            <div className="slider">
                <span>Character Length: {length}</span>
                <input type="range" min='4' max='20'
                value={length}
                onChange={(e) => setLength(e.target.value)}/>
            </div>

            <div className='checkboxes'>
                {checkBoxData.map((item, index) => <div key={index}>
                    <input type="checkbox" checked={item.state} onChange={() => handleCheckbox(index)}/>
                    <label>{item.title}</label>
                </div>)}
            </div>

            {errorMessage && <div className='error'> {errorMessage} </div>}

            <PasswordStrength password={password}/>

            <div>
                <button onClick={() => generatePassword(checkBoxData, length)}>Generate Password</button>
            </div>
            
        </div>
    </div>
}